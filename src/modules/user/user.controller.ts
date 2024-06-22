import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UserUpdateDto } from './dto/user.dto';

@UsePipes(new ValidationPipe())
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async createUser(@Body() userDto: UserDto) {
    return await this.userService.create(userDto);
  }

  @Get()
  async getUsers() {
    return await this.userService.findAll();
  }
  @Patch('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() userUpdateDto: UserUpdateDto,
  ) {
    return await this.userService.updateUser(id, userUpdateDto);
  }

  @Get('/changes/:id')
  async getChanges(
    @Param('id') id: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.userService.getChanges(id, page, limit);
  }
}
