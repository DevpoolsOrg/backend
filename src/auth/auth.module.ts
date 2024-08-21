import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { JwtCookiesStrategy } from './strategies/JwtCookies.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtCookiesStrategy],
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ( configService: ConfigService ) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      })
    }),
    UsersModule,
  ],
  exports: [ JwtStrategy, JwtCookiesStrategy, PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
