import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';
import { EmployeeDto } from './dto/create-employee.dto';
import { CreateEmployeeFilterDto } from './dto/create-employee-filter.dto';

@Controller('employee')
export class EmployeeController {
    constructor(private employeeService:EmployeeService){}

    // @Get()
    // getAll(@Query() filterDto: CreateEmployeeFilterDto): Employee[]{
    //     if(Object.keys(filterDto).length){
    //         return this.employeeService.getFilterEmployee(filterDto);
    //     }else{
    //         return this.employeeService.getAll();
    //     }
    // }

    @Get()
    getAll(@Query() filterDto: CreateEmployeeFilterDto): Promise<Employee[]>{
        if(Object.keys(filterDto).length){
            return this.employeeService.getFilterEmployee(filterDto);
        }else{
            return this.employeeService.getAll();
        }
    }


    @Post()
    create(@Body() createEmployeeDto: EmployeeDto){
        return this.employeeService.createEmployee(createEmployeeDto);
    }

    // @Get('/:id')
    // getById(@Param('id') id: string): Employee{
    //     return this.employeeService.getById(id);
    // }

    @Get('/:id')
    getById(@Param('id') id: string): Promise<Employee>{
        return this.employeeService.getById(id);
    }

    // @Delete('/:id')
    // deleteById(@Param('id') id: string): void{
    //     return this.employeeService.deleteById(id);
    // }

    @Delete('/:id')
    deleteById(@Param('id') id: string): Promise<void>{
        return this.employeeService.deleteById(id);
    }

    // @Put('/:id')
    // updateById(@Param('id') id: string, @Body() updateEmployeeDto: EmployeeDto): void{
    //     return this.employeeService.updateById(id, updateEmployeeDto);
    // }

    @Put('/:id')
    updateById(@Param('id') id: string, @Body() updateEmployeeDto: EmployeeDto): Promise<void>{
        return this.employeeService.updateById(id, updateEmployeeDto);
    }
}
