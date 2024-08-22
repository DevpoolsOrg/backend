import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto, ResetPasswordDto, ForgotPasswordDto, PasswordDto } from './dto';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from './decorators/get-user.decorator';
import { Auth } from './decorators/auth.decorator';
import { ValidRoles } from './interfaces';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('get-roles')
  @Auth()
  getRoles() {
    return (ValidRoles);
  };

  @Post('login')
  @HttpCode(200)
  async login(@Res({ passthrough: true }) response: Response, @Body() loginUserDto: LoginUserDto) {
    const {access_token, user}= await this.authService.login(loginUserDto);
    response.cookie('access_token', access_token, { httpOnly: true, secure: true, sameSite:"none" });
    return { user, access_token };
  };

  @Post('register')
  @HttpCode(201)
  async register(@Res({ passthrough: true }) response: Response,@Body() registerUserDto: RegisterUserDto) {
    const {access_token, user}= await this.authService.register(registerUserDto);
    response.cookie('access_token', access_token, { httpOnly: true, secure: true, sameSite:"none" });
    return { user, access_token };
    
  };

  @Get('logout')
  @Auth()
  @HttpCode(204)
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
    return
  };

  @Get('check-auth-status')
  @HttpCode(200)
  @Auth()
  async checkAuthStatus(@Res({ passthrough: true }) response: Response, @GetUser() user: User) {
    const {access_token, user: userResponse}= await this.authService.checkAuthStatus(user);
    response.cookie('access_token', access_token, { httpOnly: true, secure: true, sameSite:"none" });
    return { user: userResponse, access_token };
  };

  @Patch('change-password')
  @HttpCode(204)
  @Auth()
  changePassword(@GetUser() user: User,
    @Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.changePassword(user, resetPasswordDto);
  };

  @Post('forgot-password')
  @HttpCode(200)
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  };

  @Post('reset-password')
  @HttpCode(204)
  @Auth()
  resetPassword(
    @Body() resetPasswordDto: PasswordDto,
    @GetUser() user: User) {
    return this.authService.resetPassword(user, resetPasswordDto);
  };



}
