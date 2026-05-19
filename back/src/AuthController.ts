import { Body, Controller, Post } from '@nestjs/common';
import jwt from 'jsonwebtoken';

type LoginUser = {
  id: number;
};

@Controller()
export class AuthController {
  @Post('login')
  login(@Body() user: LoginUser) {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET is not configured');
    }

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: '1h',
    });

    return { user, token };
  }
}
