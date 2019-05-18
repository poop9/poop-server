import { Geolocation } from '../models/Geolocatoin';
import { BaseRepository } from './base/BaseRepository';

export class GeolocationRepository extends BaseRepository<Geolocation> {
  constructor() {
    super(Geolocation);
  }
}
