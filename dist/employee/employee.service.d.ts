import { EmployeeDto } from './dto/create-employee.dto';
import { CreateEmployeeFilterDto } from './dto/create-employee-filter.dto';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
export declare class EmployeeService {
    private employeeRepository;
    constructor(employeeRepository: Repository<Employee>);
    getAll(): Promise<Employee[]>;
    getFilterEmployee(filterDto: CreateEmployeeFilterDto): Promise<Employee[]>;
    createEmployee(createEmployeeDto: EmployeeDto): Promise<Employee>;
    getById(id: string): Promise<Employee>;
    deleteById(id: string): Promise<void>;
    updateById(id: string, updateEmployeeDto: EmployeeDto): Promise<void>;
}
