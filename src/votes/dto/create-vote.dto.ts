import { IsNotEmpty, IsString } from "class-validator";



export class CreateVoteDto {
    @IsString()
    @IsNotEmpty()
    voteOption:string
};
