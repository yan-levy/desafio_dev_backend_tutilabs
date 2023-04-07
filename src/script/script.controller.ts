import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { ScriptService } from './script.service';
import { CreateScriptDto } from './dto/create-script.dto';
import { UpdateScriptDto } from './dto/update-script.dto';
import { idParamDto } from './dto/id-param.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { HomologScriptDto } from './dto/homolog-script.dto';

@Controller('script')
export class ScriptController {
  constructor(private readonly scriptService: ScriptService) {}

  @Post()
  @UseInterceptors(FileInterceptor('script'))
  create(
    @UploadedFile() file: Express.Multer.File, //TODO: Must accept only txt and pdf
    @Body() createScriptDto: any, //TODO: type CreateScriptDto
  ) {
    console.log(createScriptDto, file);

    return this.scriptService.create(createScriptDto);
  }

  @Get('list/:id')
  findAll(@Param('id') id: idParamDto) {
    console.log(+id);

    return this.scriptService.findAll(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scriptService.findOne(+id);
  }

  @Patch(':id') //TODO:
  update(@Param('id') id: string, @Body() updateScriptDto: UpdateScriptDto) {
    return this.scriptService.update(+id, updateScriptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scriptService.remove(+id);
  }

  @Put()
  homolog(@Body() homologScriptDto: HomologScriptDto) {
    this.scriptService.homolog(homologScriptDto);
  }
}
