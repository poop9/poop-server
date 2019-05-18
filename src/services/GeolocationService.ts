import { Geolocation } from '../models/Geolocatoin';
import { User } from '../models/User';
import { GeolocationRepository } from '../repositories/GeolocationRepository';

export class GeolocationService {

  private geolocationRepository: GeolocationRepository;

  constructor() {
    this.geolocationRepository = new GeolocationRepository();
  }

  create(user:User, x: number, y: number, z: number): Promise<Geolocation> {
    const newGeolocation = new Geolocation();
    newGeolocation.user = user;
    newGeolocation.x = x;
    newGeolocation.y = y;
    newGeolocation.z = z;
    return this.geolocationRepository.create(newGeolocation);
  }

}
