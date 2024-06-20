import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

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
  @UsePipes(new ValidationPipe())
  @Patch('/:id')
  async updateUser(@Param('id') id: number, @Body() userUpdateDto) {
    return await this.userService.updateUser(id, userUpdateDto);
  }
}
