import { PartialType } from '@nestjs/swagger';
import { CreateScriptDto } from './create-script.dto';
import { IsNumber } from 'class-validator';

export class UpdateScriptDto extends PartialType(CreateScriptDto) {
  @IsNumber()
  id: number;
}
