import { BaseUserDto } from './base.user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UserDto extends BaseUserDto {}

export class UserUpdateDto extends PartialType(BaseUserDto) {}
