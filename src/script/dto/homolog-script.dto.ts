import { PartialType } from '@nestjs/swagger';
import { CreateScriptDto } from './create-script.dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HomologScriptDto extends PartialType(CreateScriptDto) {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  commentary: string;

  @IsBoolean()
  homolog: boolean;
}
