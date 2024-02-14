import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import { SignInAuthDto, SignUpAuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(@Body() signInAuthDto: SignInAuthDto) {
    return this.authService.signIn(signInAuthDto);
  }
  @Post('signup')
  signUp(@Body() SignUpAuth: SignUpAuthDto) {
    return this.authService.signUp(SignUpAuth);
  }

  @Post('signoff')
  signOff() {
    return this.authService.signOff();
  }
}
