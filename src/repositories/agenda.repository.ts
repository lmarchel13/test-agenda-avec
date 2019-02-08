import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Agenda} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AgendaRepository extends DefaultCrudRepository<
  Agenda,
  typeof Agenda.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Agenda, dataSource);
  }
}
