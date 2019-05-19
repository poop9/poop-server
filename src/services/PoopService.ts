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

  async getTodayPoopByUser(user: User): Promise<number> {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const [, count] = await this.poopRepository.findWithCount({ where: { user, createdAt: MoreThan(date) } });
    return count;
  }
  async getWeekPoopByUser(user: User): Promise<number> {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    const [, count] = await this.poopRepository.findWithCount({ where: { user, createdAt: MoreThan(date) } });
    return count;
  }
  async getMonthPoopByUser(user: User): Promise<number> {
    const date = new Date();
    const day = date.getDate();
    date.setDate(date.getDate() - day - 1);
    const [, count] = await this.poopRepository.findWithCount({ where: { user, createdAt: MoreThan(date) } });
    return count;
  }

  getList(): Promise<Poop[]> {
// tslint:disable-next-line: max-line-length
    return this.poopRepository.query('SELECT *, COUNT(`user_id`) AS count,@num:=@num+1 as num FROM (select @num:=0) a, `poops` LEFT JOIN `users` ON poops.user_id = users.id GROUP BY `user_id` ORDER BY count asc');
  }

  getLast(): Promise<Poop[]> {
    // tslint:disable-next-line: max-line-length
    return this.poopRepository.query('SELECT * FROM `poops` LEFT JOIN `geolocations` ON poops.user_id = geolocations.user_id');
  }
}
