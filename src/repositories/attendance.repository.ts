import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Attendance, AttendanceRelations, Employee} from '../models';
import {EmployeeRepository} from './employee.repository';

export class AttendanceRepository extends DefaultCrudRepository<
  Attendance,
  typeof Attendance.prototype.id,
  AttendanceRelations
> {

  public readonly Employee: BelongsToAccessor<Employee, typeof Attendance.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(Attendance, dataSource);
    this.Employee = this.createBelongsToAccessorFor('Employee', employeeRepositoryGetter,);
    this.registerInclusionResolver('Employee', this.Employee.inclusionResolver);
  }
}
