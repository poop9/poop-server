import { Poop } from '../models/Poop';
import { User } from '../models/User';
import { PoopRepository } from '../repositories/PoopRepository';

export class PoopService {

  private poopRepository: PoopRepository;

  constructor() {
    this.poopRepository = new PoopRepository();
  }

  async create(user: User): Promise<Poop> {
    const newPoop = new Poop();
    newPoop.user = user;
    return this.poopRepository.create(newPoop);
  }

}
