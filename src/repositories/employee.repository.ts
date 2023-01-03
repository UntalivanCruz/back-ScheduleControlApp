import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Employee, EmployeeRelations, EmployeePositions, Attendance} from '../models';
import {EmployeePositionsRepository} from './employee-positions.repository';
import {AttendanceRepository} from './attendance.repository';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {

  public readonly EmployeePositions: BelongsToAccessor<EmployeePositions, typeof Employee.prototype.id>;

  public readonly attendances: HasManyRepositoryFactory<Attendance, typeof Employee.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('EmployeePositionsRepository') protected employeePositionsRepositoryGetter: Getter<EmployeePositionsRepository>, @repository.getter('AttendanceRepository') protected attendanceRepositoryGetter: Getter<AttendanceRepository>,
  ) {
    super(Employee, dataSource);
    this.attendances = this.createHasManyRepositoryFactoryFor('attendances', attendanceRepositoryGetter,);
    this.registerInclusionResolver('attendances', this.attendances.inclusionResolver);
    this.EmployeePositions = this.createBelongsToAccessorFor('EmployeePositions', employeePositionsRepositoryGetter,);
    this.registerInclusionResolver('EmployeePositions', this.EmployeePositions.inclusionResolver);
  }
}
