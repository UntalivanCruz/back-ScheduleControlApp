import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Department, DepartmentRelations, EmployeePositions} from '../models';
import {EmployeePositionsRepository} from './employee-positions.repository';

export class DepartmentRepository extends DefaultCrudRepository<
  Department,
  typeof Department.prototype.id,
  DepartmentRelations
> {

  public readonly employeePositions: HasManyRepositoryFactory<EmployeePositions, typeof Department.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('EmployeePositionsRepository') protected employeePositionsRepositoryGetter: Getter<EmployeePositionsRepository>,
  ) {
    super(Department, dataSource);
    this.employeePositions = this.createHasManyRepositoryFactoryFor('employeePositions', employeePositionsRepositoryGetter,);
    this.registerInclusionResolver('employeePositions', this.employeePositions.inclusionResolver);
  }
}
