import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  EmployeePositions,
  Department,
} from '../models';
import {EmployeePositionsRepository} from '../repositories';

export class EmployeePositionsDepartmentController {
  constructor(
    @repository(EmployeePositionsRepository)
    public employeePositionsRepository: EmployeePositionsRepository,
  ) { }

  @get('/employee-positions/{id}/department', {
    responses: {
      '200': {
        description: 'Department belonging to EmployeePositions',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Department)},
          },
        },
      },
    },
  })
  async getDepartment(
    @param.path.string('id') id: typeof EmployeePositions.prototype.id,
  ): Promise<Department> {
    return this.employeePositionsRepository.Department(id);
  }
}
