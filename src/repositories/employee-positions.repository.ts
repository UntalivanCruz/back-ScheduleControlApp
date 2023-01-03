import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {EmployeePositions, EmployeePositionsRelations, Employee, Department, Workshift} from '../models';
import {EmployeeRepository} from './employee.repository';
import {DepartmentRepository} from './department.repository';
import {WorkshiftRepository} from './workshift.repository';

export class EmployeePositionsRepository extends DefaultCrudRepository<
  EmployeePositions,
  typeof EmployeePositions.prototype.id,
  EmployeePositionsRelations
> {

  public readonly employees: HasManyRepositoryFactory<Employee, typeof EmployeePositions.prototype.id>;

  public readonly Department: BelongsToAccessor<Department, typeof EmployeePositions.prototype.id>;

  public readonly workshift: BelongsToAccessor<Workshift, typeof EmployeePositions.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>, @repository.getter('DepartmentRepository') protected departmentRepositoryGetter: Getter<DepartmentRepository>, @repository.getter('WorkshiftRepository') protected workshiftRepositoryGetter: Getter<WorkshiftRepository>,
  ) {
    super(EmployeePositions, dataSource);
    this.workshift = this.createBelongsToAccessorFor('workshift', workshiftRepositoryGetter,);
    this.registerInclusionResolver('workshift', this.workshift.inclusionResolver);
    this.Department = this.createBelongsToAccessorFor('Department', departmentRepositoryGetter,);
    this.registerInclusionResolver('Department', this.Department.inclusionResolver);
    this.employees = this.createHasManyRepositoryFactoryFor('employees', employeeRepositoryGetter,);
    this.registerInclusionResolver('employees', this.employees.inclusionResolver);
  }
}
