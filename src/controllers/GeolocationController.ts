import { Authorized, BodyParam, CurrentUser, JsonController, Post, UseInterceptor } from 'routing-controllers';
import { EntityInterceptor } from '../interceptors/EntityInterceptor';
import { User } from '../models/User';
import { GeolocationService } from '../services/GeolocationService';
import { AuthModel } from '../utils/AuthHelper';

@JsonController()
export class GeolocationController {

  @Authorized()
  @Post('/gps')
  @UseInterceptor(EntityInterceptor)
  async gps(
    @CurrentUser({ required: true }) user: User,
    @BodyParam('x', { required: true }) x: number,
    @BodyParam('y', { required: true }) y: number,
  ) {
    return new GeolocationService().create(user, x, y);
  }

  async geo(authModel: AuthModel) {
    const geolocation = await new GeolocationService().getGeolocationdByUUID(authModel.uuid);
    return geolocation;
  }
}
