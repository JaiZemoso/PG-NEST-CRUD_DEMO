"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employee_entity_1 = require("./employee.entity");
const typeorm_2 = require("typeorm");
let EmployeeService = class EmployeeService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    async getAll() {
        return await this.employeeRepository.find();
    }
    async getFilterEmployee(filterDto) {
        const { namerole, experience } = filterDto;
        let employees = await this.getAll();
        if (experience) {
            employees = employees.filter((employee) => employee.experience === experience);
        }
        if (namerole) {
            employees = employees.filter((employee) => {
                if (employee.name.includes(namerole) || employee.role.includes(namerole)) {
                    return true;
                }
                return false;
            });
        }
        return employees;
    }
    async createEmployee(createEmployeeDto) {
        const city = this.employeeRepository.create(createEmployeeDto);
        return await this.employeeRepository.save(city);
    }
    async getById(id) {
        const found = await this.employeeRepository.findOne({ where: { id } });
        if (!found) {
            throw new common_1.NotFoundException(`Employee with "${id}" not found`);
        }
        return found;
    }
    async deleteById(id) {
        const found = await this.employeeRepository.findOne({ where: { id } });
        if (!found) {
            throw new common_1.NotFoundException(`Employee with "${id}" not found`);
        }
        await this.employeeRepository.remove(found);
    }
    async updateById(id, updateEmployeeDto) {
        const found = await this.employeeRepository.findOne({ where: { id } });
        if (!found) {
            throw new common_1.NotFoundException(`Employee with "${id}" not found`);
        }
        Object.assign(found, updateEmployeeDto);
        await this.employeeRepository.save(found);
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map