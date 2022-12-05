import {
  BadRequestException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as ElasticEmail from '@elasticemail/elasticemail-client';
import { ConfirmDTO } from './dto/email.dto';
import { UserService } from '../user/user.service';
@Injectable()
export class EmailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {
    const defaultClient = ElasticEmail.ApiClient.instance;
    const apikey = defaultClient.authentications['apikey'];
    apikey.apiKey = this.configService.get('EMAIL_API_KEY');
  }

  sendEmail(options) {
    const api = new ElasticEmail.EmailsApi();
    const email = ElasticEmail.EmailMessageData.constructFromObject({
      Recipients: [new ElasticEmail.EmailRecipient(options.to)],
      Content: {
        Body: [
          ElasticEmail.BodyPart.constructFromObject({
            ContentType: 'HTML',
            Content: options.text
          })
        ],
        Subject: options.subject,
        From: this.configService.get('EMAIL_URL')
      }
    });
    api.emailsPost(email, (err) => {
      if (err) {
        throw new InternalServerErrorException(err);
      }
    });
  }

  sendVerificationLink(email: string) {
    const token = this.jwtService.sign(
      { email },
      {
        expiresIn: this.configService.get('JWT_VERIFY_EXPIRES')
      }
    );

    const url = `${this.configService.get('JWT_VERIFY_URL')}/token=${token}`;
    const content = `Welcome to the application. To confirm the email address, click here: ${url}`;
    return this.sendEmail({
      to: email,
      subject: 'Email confirmation',
      text: content
    });
  }

  async decodeEmailToken(token: string): Promise<string> {
    try {
      const payload = this.jwtService.verify(token);
      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (e) {
      if (e?.name === 'TokenExpiredError') {
        throw new BadRequestException('Token was expired');
      }
      throw new BadRequestException('Bad token confirmation');
    }
  }

  async confirmEmail(email: string) {
    const user = await this.userService.getUserEmail(email);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email was confirmed');
    }
    await this.userService.markEmailConfirm(email);
  }
}
