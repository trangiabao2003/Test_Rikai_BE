import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './public.decorator';
import { PrismaService } from '../prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}

  @Public()
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('profile')
  async getProfile(@Request() req: ExpressRequest & { user: { id: number } }) {
    // ✅ FIX: Query database instead of returning JWT payload
    // This ensures we always get the latest user data including updated role
    const user = await this.prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        bio: true,
        role: true,
        createdAt: true,
      },
    });

    // ✅ FIX: Throw error if user not found instead of returning null
    // This prevents frontend from getting null response and auto-logout
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
