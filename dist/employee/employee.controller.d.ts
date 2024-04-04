import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';
import { EmployeeDto } from './dto/create-employee.dto';
import { CreateEmployeeFilterDto } from './dto/create-employee-filter.dto';
export declare class EmployeeController {
    private employeeService;
    constructor(employeeService: EmployeeService);
    getAll(filterDto: CreateEmployeeFilterDto): Promise<Employee[]>;
    create(createEmployeeDto: EmployeeDto): Promise<Employee>;
    getById(id: string): Promise<Employee>;
    deleteById(id: string): Promise<void>;
    updateById(id: string, updateEmployeeDto: EmployeeDto): Promise<void>;
}
