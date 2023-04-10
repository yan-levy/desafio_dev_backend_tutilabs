import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ScriptModule } from './script/script.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ScriptModule,
    MailModule,
  ],
  controllers: [],
  // providers: [{ provide: APP_GUARD, useClass: RoleGuard }],
})
export class AppModule {}
