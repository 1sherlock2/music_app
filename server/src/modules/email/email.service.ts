import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

@Injectable()
export class EmailService {
  private mailgunTransport;
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {
    const mailgun = new Mailgun(formData);
    this.mailgunTransport = mailgun.client({
      username: this.configService.get('EMAIL_USER_NAME'),
      key: this.configService.get('EMAIL_API_KEY'),
      public_key: this.configService.get('EMAIL_PUBLIC_API_KEY'),
      url: this.configService.get('EMAIL_DOMAIN')
    });
  }

  sendEmail(options) {
    return this.mailgunTransport.messages.create(
      this.configService.get('EMAIL_URL'),
      options
    );
  }

  sendVerificationLink(email: string) {
    const token = this.jwtService.sign(
      { email },
      {
        secret: this.configService.get('JWT_VERIRIFY_TOKEN'),
        expiresIn: this.configService.get('JWT_VERIFY_EXPIRES')
      }
    );

    const url = `${this.configService.get('JWT_VERIFY_URL')}$token=${token}`;
    const content = `Welcome to the application. To confirm the email address, click here: ${url}`;
    return this.sendEmail({
      to: email,
      subject: 'Email confirmation',
      text: content
    });
  }
}
