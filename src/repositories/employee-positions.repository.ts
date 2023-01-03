import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {EmployeePositions, EmployeePositionsRelations, Employee} from '../models';
import {EmployeeRepository} from './employee.repository';

export class EmployeePositionsRepository extends DefaultCrudRepository<
  EmployeePositions,
  typeof EmployeePositions.prototype.id,
  EmployeePositionsRelations
> {

  public readonly employees: HasManyRepositoryFactory<Employee, typeof EmployeePositions.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(EmployeePositions, dataSource);
    this.employees = this.createHasManyRepositoryFactoryFor('employees', employeeRepositoryGetter,);
    this.registerInclusionResolver('employees', this.employees.inclusionResolver);
  }
}
