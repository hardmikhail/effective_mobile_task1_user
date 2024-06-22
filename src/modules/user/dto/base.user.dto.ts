import { IsPositive, IsString } from 'class-validator';

export class BaseUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsPositive()
  age: number;
}
