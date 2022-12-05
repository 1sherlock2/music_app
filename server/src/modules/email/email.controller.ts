import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ConfirmDTO } from './dto/email.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @HttpCode(HttpStatus.OK)
  @Post('confirm')
  async confirm(@Body() confirmData: ConfirmDTO) {
    const email = await this.emailService.decodeEmailToken(confirmData.token);
    await this.emailService.confirmEmail(email);
  }
}
