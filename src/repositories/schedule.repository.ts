import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Schedule, ScheduleRelations, Workshift} from '../models';
import {WorkshiftRepository} from './workshift.repository';

export class ScheduleRepository extends DefaultCrudRepository<
  Schedule,
  typeof Schedule.prototype.id,
  ScheduleRelations
> {

  public readonly workshift: BelongsToAccessor<Workshift, typeof Schedule.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('WorkshiftRepository') protected workshiftRepositoryGetter: Getter<WorkshiftRepository>,
  ) {
    super(Schedule, dataSource);
    this.workshift = this.createBelongsToAccessorFor('workshift', workshiftRepositoryGetter,);
    this.registerInclusionResolver('workshift', this.workshift.inclusionResolver);
  }
}
