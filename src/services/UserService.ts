import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';

export class UserService {

  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async signIn(uuid: string):  Promise<User|undefined> {
    const user = this.userRepository.findOne({ where: { uuid } });
    if (!!user) {
      const newUser = new User();
      newUser.uuid = uuid;
      return this.userRepository.create(newUser);
    }
    return user;
  }

  async getUserByUuid(uuid: string): Promise<User|undefined> {
    return this.userRepository.findOne({ where:{ uuid } });
  }

}
