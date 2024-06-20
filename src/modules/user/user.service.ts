import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto, UserUpdateDto } from './dto/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(userDto: UserDto): Promise<User> {
    return await this.userRepository.save(userDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async updateUser(id: number, userUpdateDto: UserUpdateDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User Not Found`);
    }
    const updatedUser = Object.assign(user, userUpdateDto);
    return this.userRepository.save(updatedUser);
  }
}
