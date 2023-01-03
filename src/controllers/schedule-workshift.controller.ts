import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Schedule,
  Workshift,
} from '../models';
import {ScheduleRepository} from '../repositories';

export class ScheduleWorkshiftController {
  constructor(
    @repository(ScheduleRepository)
    public scheduleRepository: ScheduleRepository,
  ) { }

  @get('/schedules/{id}/workshift', {
    responses: {
      '200': {
        description: 'Workshift belonging to Schedule',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Workshift)},
          },
        },
      },
    },
  })
  async getWorkshift(
    @param.path.string('id') id: typeof Schedule.prototype.id,
  ): Promise<Workshift> {
    return this.scheduleRepository.workshift(id);
  }
}
