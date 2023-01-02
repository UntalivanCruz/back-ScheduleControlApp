import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {EmployeePositions, EmployeePositionsRelations} from '../models';

export class EmployeePositionsRepository extends DefaultCrudRepository<
  EmployeePositions,
  typeof EmployeePositions.prototype.id,
  EmployeePositionsRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(EmployeePositions, dataSource);
  }
}
