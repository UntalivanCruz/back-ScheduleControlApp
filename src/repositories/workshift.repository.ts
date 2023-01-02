import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Workshift, WorkshiftRelations} from '../models';

export class WorkshiftRepository extends DefaultCrudRepository<
  Workshift,
  typeof Workshift.prototype.id,
  WorkshiftRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Workshift, dataSource);
  }
}
