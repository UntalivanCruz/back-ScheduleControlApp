import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Workshift, WorkshiftRelations, EmployeePositions} from '../models';
import {EmployeePositionsRepository} from './employee-positions.repository';

export class WorkshiftRepository extends DefaultCrudRepository<
  Workshift,
  typeof Workshift.prototype.id,
  WorkshiftRelations
> {

  public readonly employeePositions: HasManyRepositoryFactory<EmployeePositions, typeof Workshift.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('EmployeePositionsRepository') protected employeePositionsRepositoryGetter: Getter<EmployeePositionsRepository>,
  ) {
    super(Workshift, dataSource);
    this.employeePositions = this.createHasManyRepositoryFactoryFor('employeePositions', employeePositionsRepositoryGetter,);
    this.registerInclusionResolver('employeePositions', this.employeePositions.inclusionResolver);
  }
}
