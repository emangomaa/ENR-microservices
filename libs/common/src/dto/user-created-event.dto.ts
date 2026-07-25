import { IsNumber, IsString } from "class-validator"



export class UserCreatedEvent{
    @IsNumber()
    id!:number

    @IsString()
    name!:string

    @IsString()
    email!:string

}