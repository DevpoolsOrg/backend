

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";

import { User } from "../../users/entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtCookiesStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UsersService,
        configService: ConfigService,
    ) {
        super({
        secretOrKey: configService.get('JWT_SECRET'),
        jwtFromRequest: ExtractJwt.fromExtractors([
            (req: Request) => {
            let token = null;
            if (req && req.cookies) {
                token = req.cookies['access_token'];
            }
            return token;
            }
        ]),
        });
    }
    
    async validate(payload: JwtPayload): Promise<User> {
        const { id } = payload;
        const user = await this.userService.findOneById( id );
        if (!user) throw new UnauthorizedException('Invalid token');
        if(!user.isActive)throw new UnauthorizedException('Inactive user, please contact support');
        return user;
    };
}