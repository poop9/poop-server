import { Poop } from '../models/Poop';
import { BaseRepository } from './base/BaseRepository';

export class PoopRepository extends BaseRepository<Poop> {
  constructor() {
    super(Poop);
  }
}
