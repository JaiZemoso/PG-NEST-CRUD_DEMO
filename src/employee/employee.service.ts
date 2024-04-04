import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeDto } from './dto/create-employee.dto';
import { CreateEmployeeFilterDto } from './dto/create-employee-filter.dto';
import { EmployeeRepository } from './employee.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
    constructor(@InjectRepository(Employee) private employeeRepository : Repository<Employee>){}
    // private employees: Employee[] = [];

    // getAll(): Employee[]{
    //     return this.employees;
    // }

    async getAll() {
        return await this.employeeRepository.find();
      }

    async getFilterEmployee(filterDto: CreateEmployeeFilterDto): Promise<Employee[]>{
        const {namerole, experience } = filterDto;
        //type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer V> ? V :never;
        let employees:Awaited<Promise<Employee[]>> = await this.getAll();

        if(experience){
            employees= employees.filter((employee) => employee.experience === experience);
        }
        if(namerole){
            employees= employees.filter((employee) => {
                if(employee.name.includes(namerole) || employee.role.includes(namerole)){
                    return true;
                }
                return false;
            });
        }
    return employees;
    }

    async createEmployee(createEmployeeDto: EmployeeDto):Promise<Employee> {
        const city = this.employeeRepository.create(createEmployeeDto);
    
        return await this.employeeRepository.save(city);
      }

    // createEmployee(createEmployeeDto: EmployeeDto): Employee{
    //     const {name,role, experience} = createEmployeeDto;
    //     const employee: Employee = {
    //         id: uuid(),
    //         name:name,
    //         role:role,
    //         experience:experience
    //     };

    //     this.employees.push(employee);
    //     return employee;
    // }

    async getById(id:string):Promise<Employee>{
        const found = await this.employeeRepository.findOne({ where: { id } });
        if(!found){
            throw new NotFoundException(`Employee with "${id}" not found`);
        }
        return found;
    }

    

    // getById(id:string):Employee{
    //     const found = this.employees.find((employee)=> employee.id===id);
    //     if(!found){
    //         throw new NotFoundException(`Employee with "${id}" not found`);
    //     }
    //     return found;
    // }

    async deleteById(id:string): Promise<void>{
        const found = await this.employeeRepository.findOne({ where: { id } });
         if (!found) {
            throw new NotFoundException(`Employee with "${id}" not found`);
          }
      
           await this.employeeRepository.remove(found);
    }

    // deleteById(id:string): void{
    //      const found = this.getById(id);
    //      this.employees = this.employees.filter((employee)=> employee.id !==found.id);
    // }

    // updateById(id: string, updateEmployeeDto: EmployeeDto): void{
    //     const toBeUpdatedEmployee = this.getById(id);
    //     toBeUpdatedEmployee.name = updateEmployeeDto.name;
    //     toBeUpdatedEmployee.role = updateEmployeeDto.role;
    //     toBeUpdatedEmployee.experience = updateEmployeeDto.experience;
    // }

    async updateById(id: string, updateEmployeeDto: EmployeeDto) : Promise<void> {
        const found = await this.employeeRepository.findOne({ where: { id } });
        if (!found) {
            throw new NotFoundException(`Employee with "${id}" not found`);
        }
    
        Object.assign(found, updateEmployeeDto);
    
         await this.employeeRepository.save(found);
      }
}
