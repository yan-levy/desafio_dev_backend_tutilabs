import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class idParamDto {
  //   @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  id: string;
}
