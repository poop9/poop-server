import { BodyParam, JsonController, Post, UseInterceptor } from 'routing-controllers';
import { EntityInterceptor } from '../interceptors/EntityInterceptor';
import { UserService } from '../services/UserService';

@JsonController()
export class AuthController {

  @Post('/sign-in')
  @UseInterceptor(EntityInterceptor)
  async signIn(
    @BodyParam('uuid', { required: true }) uuid: string,
    @BodyParam('nickname', { required: true }) nickname: string,
  ) {
    return new UserService().getUser(uuid, nickname);
  }

  @Post('/sign-up')
  @UseInterceptor(EntityInterceptor)
  async signUn(
    @BodyParam('uuid', { required: true }) uuid: string,
    @BodyParam('nickname', { required: true }) nickname: string,
  ) {
    return new UserService().create(uuid, nickname);
  }
}
