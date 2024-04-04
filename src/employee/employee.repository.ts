import { EntityRepository, Repository } from "typeorm";
import { Employee } from "./employee.entity";

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee>{
    // constructor(private dataSource: DataSource) {
    //     console.log('>>> datasource details <<<<', dataSource);
    //     super(Employee, dataSource.createEntityManager());
    // }

    // async getById(id: string) {
    //     return this.findOne({ where: { id } });
    //   }
      
}