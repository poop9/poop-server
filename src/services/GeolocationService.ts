import { Socket } from 'socket.io';
import { Geolocation } from '../models/Geolocatoin';
import { User } from '../models/User';
import { GeolocationRepository } from '../repositories/GeolocationRepository';

export class GeolocationService {

  private geolocationRepository: GeolocationRepository;

  constructor() {
    this.geolocationRepository = new GeolocationRepository();
  }

  create(user: User, x: number, y: number, z: number): Promise<Geolocation> {
    const newGeolocation = new Geolocation();
    newGeolocation.user = user;
    newGeolocation.x = x;
    newGeolocation.y = y;
    newGeolocation.z = z;
    return this.geolocationRepository.create(newGeolocation);
  }

  getGeolocationdByUser(user: User) {
    return this.geolocationRepository.findOne({ where: { user } });
  }

  sendYa(user: User, socket: Socket) {
    const geolocation = this.geolocationRepository.findOne({ where: { user } });
    const socketId: string = user.socketId || '';
    socket.to(socketId).emit('new message', geolocation);
  }
}
