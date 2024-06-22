import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto, UserUpdateDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Changes } from 'src/interfaces/user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly httpService: HttpService,
  ) {}

  private async sendEvent(event: string, data: UserDto): Promise<void> {
    const eventServiceUrl = 'http://localhost:3001/events';
    await firstValueFrom(
      this.httpService.post(eventServiceUrl, { event, data }),
    );
  }

  private async getEvent(
    id: number,
    page: number,
    limit: number,
  ): Promise<Changes[]> {
    const eventServiceUrl = `http://localhost:3001/changes/${id}?page=${page}&limit=${limit}`;
    const response = await firstValueFrom(
      this.httpService.get(eventServiceUrl),
    );
    return response.data;
  }

  async create(userDto: UserDto): Promise<User> {
    const user = await this.userRepository.save(userDto);
    await this.sendEvent('user_created', user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getChanges(
    id: number,
    page: number,
    limit: number,
  ): Promise<Changes[]> {
    return await this.getEvent(id, page, limit);
  }

  async updateUser(id: number, userUpdateDto: UserUpdateDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User Not Found`);
    }
    const updatedUser = Object.assign(user, userUpdateDto);
    await this.sendEvent('user_updated', updatedUser);
    return this.userRepository.save(updatedUser);
  }
}
