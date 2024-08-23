import { IsArray, IsNotEmpty, IsString } from "class-validator";


export class ChangeRoleDto {
    @IsArray()
    @IsNotEmpty()
    roles: string[];
};