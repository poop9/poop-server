import { User } from '../models/User';
import { UserRepository } from './../repositories/UserRepository';

export class UserService {

  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUser(uuid: string, nickname: string): Promise<User|undefined> {
    return this.userRepository.findOne({ where: { uuid, nickname } });
  }

  async create(uuid: string, nickname: string):  Promise<User> {
    const newUser = new User();
    newUser.uuid = uuid;
    newUser.nickname = nickname;
    return this.userRepository.create(newUser);
  }
}
