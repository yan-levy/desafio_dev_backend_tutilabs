import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  // async sendUserConfirmation(user: User, token: string) {
  async sendUserConfirmation() {
    // const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: 'yan',
      from: process.env.MAIL_USER, // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: 'yan',
        url: `example.com/auth/confirm?token=
          eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
            .eyJzdWIiOjQsImVtYWlsIjoiYWRtaW5pbmFzdHJvM0BnbWFpbC5jb20iLCJuYW1lIjoiQWRtaW5pbmFzdHLDtCIsImlhdCI6MTY4MTAxNTQwNywiZXhwIjoxNjgxMTAxODA3fQ
            .VJDofKQWtveaLi9Gqk97figzH2E3nxp8L1E - jZ_q9j4
        `,
      },
    });
  }
}
