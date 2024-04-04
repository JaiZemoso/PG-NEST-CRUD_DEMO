import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class EmployeeDto{
    @IsNotEmpty()
    name:string;
    @IsNotEmpty()
    role:string;
    @IsNotEmpty()
    experience:Number;
}