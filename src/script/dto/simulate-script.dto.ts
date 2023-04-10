import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class SimulateScriptDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantity: number;
}
