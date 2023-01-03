import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Workshift, WorkshiftRelations, EmployeePositions, Schedule} from '../models';
import {EmployeePositionsRepository} from './employee-positions.repository';
import {ScheduleRepository} from './schedule.repository';

export class WorkshiftRepository extends DefaultCrudRepository<
  Workshift,
  typeof Workshift.prototype.id,
  WorkshiftRelations
> {

  public readonly employeePositions: HasManyRepositoryFactory<EmployeePositions, typeof Workshift.prototype.id>;

  public readonly schedules: HasManyRepositoryFactory<Schedule, typeof Workshift.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('EmployeePositionsRepository') protected employeePositionsRepositoryGetter: Getter<EmployeePositionsRepository>, @repository.getter('ScheduleRepository') protected scheduleRepositoryGetter: Getter<ScheduleRepository>,
  ) {
    super(Workshift, dataSource);
    this.schedules = this.createHasManyRepositoryFactoryFor('schedules', scheduleRepositoryGetter,);
    this.registerInclusionResolver('schedules', this.schedules.inclusionResolver);
    this.employeePositions = this.createHasManyRepositoryFactoryFor('employeePositions', employeePositionsRepositoryGetter,);
    this.registerInclusionResolver('employeePositions', this.employeePositions.inclusionResolver);
  }
}
