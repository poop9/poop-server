import { Geolocation } from '../models/Geolocatoin';
import { User } from '../models/User';
import { GeolocationRepository } from '../repositories/GeolocationRepository';
import { UserRepository } from '../repositories/UserRepository';

export class GeolocationService {

  private geolocationRepository: GeolocationRepository;
  private userRepository: UserRepository;

  constructor() {
    this.geolocationRepository = new GeolocationRepository();
    this.userRepository = new UserRepository();
  }

  create(user: User, x: number, y: number): Promise<Geolocation> {
    const newGeolocation = new Geolocation();
    newGeolocation.user = user;
    newGeolocation.x = x;
    newGeolocation.y = y;
    return this.geolocationRepository.create(newGeolocation);
  }

  getGeolocationdByUser(user: User) {
    return this.geolocationRepository.findOne({ where: { user } });
  }
  async getGeolocationdByUUID(uuid: string) {
    const user = await this.userRepository.findOne({ where: { uuid } });
    return await this.geolocationRepository.findOne({ where: { user } });
  }

}
