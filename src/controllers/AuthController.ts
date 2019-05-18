import { BodyParam, JsonController, Post, UseInterceptor } from 'routing-controllers';
import { EntityInterceptor } from '../interceptors/EntityInterceptor';
import { AuthHelper } from '../utils/AuthHelper';

@JsonController()
export class AuthController {

  @Post('/sign-in')
  @UseInterceptor(EntityInterceptor)
  async signIn(
    @BodyParam('uuid', { required: true }) uuid: string,
    @BodyParam('nickname', { required: true }) nickname: string,
  ) {
    const token = AuthHelper.generate({ uuid, nickname });

    return {
      token,
    };
  }
  @Post('/sign-up')
  @UseInterceptor(EntityInterceptor)
  async signUp(
    @BodyParam('uuid', { required: true }) uuid: string,
    @BodyParam('nickname', { required: true }) nickname: string,
  ) {
    const token = AuthHelper.generate({ uuid, nickname });
    return {
      token,
    };
  }
}
