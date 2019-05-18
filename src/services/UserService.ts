import { User } from '../models/User';
import { UserRepository } from './../repositories/UserRepository';

export class UserService {

  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  getUser(uuid: string, nickname: string): Promise<User|undefined> {
    return this.userRepository.findOne({ where: { uuid, nickname } });
  }

  getUsers(): Promise<[User[], number]> {
    return this.userRepository.findWithCount({ where: { } });
  }

  async create(uuid: string, nickname: string):  Promise<User> {
    const newUser = new User();
    newUser.uuid = uuid;
    newUser.nickname = nickname;
    return this.userRepository.create(newUser);
  }

  async update(user: User, socketId: string) {
    const newUser = new User();
    newUser.nickname = user.nickname;
    newUser.uuid = user.uuid;
    newUser.socketId = socketId;
    return this.userRepository.update(user.id, newUser);
  }
}
