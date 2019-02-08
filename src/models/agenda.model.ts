import {Entity, model, property} from '@loopback/repository';

@model()
export class Agenda extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'date',
    required: true,
  })
  datahora: string;

  @property({
    type: 'number',
    required: true,
  })
  id_customer: number;

  @property({
    type: 'number',
    required: true,
  })
  id_pro: number;

  @property({
    type: 'number',
    required: true,
  })
  id_service: number;


  constructor(data?: Partial<Agenda>) {
    super(data);
  }
}
