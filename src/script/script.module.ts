import { Module } from '@nestjs/common';
import { ScriptService } from './script.service';
import { ScriptController } from './script.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailModule } from 'src/mail/mail.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MailModule, AuthModule],
  controllers: [ScriptController],
  providers: [ScriptService, PrismaService],
})
export class ScriptModule {}
