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
  HttpCode,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ScriptService } from './script.service';
import { CreateScriptDto } from './dto/create-script.dto';
import { UpdateScriptDto } from './dto/update-script.dto';
import { idParamDto } from './dto/id-param.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { HomologScriptDto } from './dto/homolog-script.dto';
import { SimulateScriptDto } from './dto/simulate-script.dto';
import { multerOptions } from 'src/config/multer.config';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import RoleGuard from 'src/auth/roles/roles.guard';
import { Role } from 'src/auth/roles/roles.enum';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('script')
@UseGuards(JwtAuthGuard, RoleGuard)
export class ScriptController {
  constructor(private readonly scriptService: ScriptService) {}

  @Post()
  @Roles(Role.Scriptwriter)
  @UseInterceptors(FileInterceptor('script', multerOptions))
  create(
    @UploadedFile() file: Express.Multer.File, //TODO: Must accept only txt and pdf
    @Body() createScriptDto: any, //TODO: type CreateScriptDto
    @Req() req,
  ) {
    return this.scriptService.create(createScriptDto, file, req);
  }

  @Get()
  @Roles(Role.Scriptwriter)
  findAll(@Req() req) {
    return this.scriptService.findAll(req);
  }

  @Get('list/:id')
  @Roles(Role.ProductionCompany) //TODO: MixinGuard
  findAllByStatus(@Req() req, @Param('id') id: idParamDto) {
    console.log(+id);

    return this.scriptService.findAllByStatus(+id, req);
  }

  @Get(':id')
  @Roles(Role.Scriptwriter)
  findOne(@Param('id') id: string) {
    return this.scriptService.findOne(+id);
  }

  @Put()
  @Roles(Role.Scriptwriter)
  @UseInterceptors(FileInterceptor('script', multerOptions))
  update(
    @UploadedFile() file: Express.Multer.File,
    @Body() updateScriptDto,
    @Req() req,
  ) {
    // console.log(file);
    // console.log(updateScriptDto);

    return this.scriptService.update(updateScriptDto, req, file);
  }

  @Delete(':id')
  @Roles(Role.Scriptwriter)
  delete(@Req() req, @Param('id') id: string) {
    return this.scriptService.delete(+id, req);
  }

  @Put()
  @Roles(Role.ProductionCompany)
  homolog(@Req() req, @Body() homologScriptDto: HomologScriptDto) {
    return this.scriptService.homolog(homologScriptDto, req);
  }

  @Post('simulate')
  @Roles(Role.ProductionCompany)
  @HttpCode(200)
  simulate(@Body() simulateScriptDto: SimulateScriptDto) {
    return this.scriptService.simulate(simulateScriptDto);
  }
}
