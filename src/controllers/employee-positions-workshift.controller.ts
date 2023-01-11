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
  Workshift,
} from '../models';
import {EmployeePositionsRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class EmployeePositionsWorkshiftController {
  constructor(
    @repository(EmployeePositionsRepository)
    public employeePositionsRepository: EmployeePositionsRepository,
  ) { }

  @get('/employee-positions/{id}/workshift', {
    responses: {
      '200': {
        description: 'Workshift belonging to EmployeePositions',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Workshift)},
          },
        },
      },
    },
  })
  async getWorkshift(
    @param.path.string('id') id: typeof EmployeePositions.prototype.id,
  ): Promise<Workshift> {
    return this.employeePositionsRepository.workshift(id);
  }
}
