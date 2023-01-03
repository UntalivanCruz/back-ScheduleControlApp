import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Employee, EmployeeRelations, EmployeePositions} from '../models';
import {EmployeePositionsRepository} from './employee-positions.repository';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {

  public readonly EmployeePositions: BelongsToAccessor<EmployeePositions, typeof Employee.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('EmployeePositionsRepository') protected employeePositionsRepositoryGetter: Getter<EmployeePositionsRepository>,
  ) {
    super(Employee, dataSource);
    this.EmployeePositions = this.createBelongsToAccessorFor('EmployeePositions', employeePositionsRepositoryGetter,);
    this.registerInclusionResolver('EmployeePositions', this.EmployeePositions.inclusionResolver);
  }
}
