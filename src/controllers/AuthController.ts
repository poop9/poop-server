import { BodyParam, JsonController, Post, UseInterceptor } from 'routing-controllers';
import { EntityInterceptor } from '../interceptors/EntityInterceptor';
import { UserService } from '../services/UserService';

@JsonController()
export class AuthController {

  @Post('/auth')
  @UseInterceptor(EntityInterceptor)
  async signIn(
    @BodyParam('uuid', { required: true }) uuid: string,
  ) {
    return new UserService().signIn(uuid);
  }

}
