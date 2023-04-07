import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateScriptDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  proposed_budget: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  file: string;

  @ApiProperty()
  @IsNumber()
  @Min(1, {
    message: `Invalid Risk value! Inform 1 to 'Low', 2 to 'Medium' or 3 to 'High'`,
  })
  @Max(3, {
    message: `Invalid Risk value! Inform 1 to 'Low', 2 to 'Medium' or 3 to 'High'`,
  })
  risk: number;
}
