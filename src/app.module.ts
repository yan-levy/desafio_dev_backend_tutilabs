import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ScriptModule } from './script/script.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, ScriptModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
