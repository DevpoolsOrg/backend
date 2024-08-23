import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { CreateUserDto } from "./create-user.dto";


export class CreateUserRolesDto extends CreateUserDto{
    @IsArray()
    @IsNotEmpty()
    roles: string[];
};