import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Employee,
  EmployeePositions,
} from '../models';
import {EmployeeRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class EmployeeEmployeePositionsController {
  constructor(
    @repository(EmployeeRepository)
    public employeeRepository: EmployeeRepository,
  ) { }

  @get('/employees/{id}/employee-positions', {
    responses: {
      '200': {
        description: 'EmployeePositions belonging to Employee',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EmployeePositions)},
          },
        },
      },
    },
  })
  async getEmployeePositions(
    @param.path.string('id') id: typeof Employee.prototype.id,
  ): Promise<EmployeePositions> {
    return this.employeeRepository.EmployeePositions(id);
  }
}
