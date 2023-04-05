import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsNumber,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsNumber()
  @Min(1, {
    message: `Invalid role! Inform 1 to 'scriptwriter', 2 to 'production_company' or 3 to 'master'`,
  })
  @Max(3, {
    message: `Invalid role! Inform 1 to 'scriptwriter', 2 to 'production_company' or 3 to 'master'`,
  })
  role: number;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
