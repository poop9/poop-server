import { MoreThan } from 'typeorm';
import { Poop } from '../models/Poop';
import { User } from '../models/User';
import { PoopRepository } from '../repositories/PoopRepository';

export class PoopService {
  [x: string]: any;

  private poopRepository: PoopRepository;

  constructor() {
    this.poopRepository = new PoopRepository();
  }

  async create(user: User): Promise<Poop> {
    const newPoop = new Poop();
    newPoop.user = user;
    return this.poopRepository.create(newPoop);
  }

  async getTodayPoopByUser(user: User): Promise<[Poop[], number]|any> {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const [, count] = await this.poopRepository.findWithCount({ where: { user, createdAt: MoreThan(date) } });
    return count;
  }
  async getWeekPoopByUser(user: User): Promise<[Poop[], number]|any> {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    const [, count] = await this.poopRepository.findWithCount({ where: { user, createdAt: MoreThan(date) } });
    return count;
  }
  async getMonthPoopByUser(user: User): Promise<[Poop[], number]|any> {
    const date = new Date();
    const day = date.getDate();
    date.setDate(date.getDate() - day - 1);
    const [, count] = await this.poopRepository.findWithCount({ where: { user, createdAt: MoreThan(date) } });
    return count;
  }

  getList(): Promise<Poop[]> {
    return this.getConnection().createQueryBuilder('Poop').select('*, count(\'user_id\')').groupBy('user_id');
  }
}
