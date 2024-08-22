import { IsNotEmpty, IsString } from "class-validator";
import { CreateUserDto } from "./create-user.dto";


export class CreateUserRolesDto extends CreateUserDto{
    @IsString()
    @IsNotEmpty()
    roles: string[];
};