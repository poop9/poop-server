import { CurrentUser, JsonController, Post } from 'routing-controllers';
import { User } from '../models/User';
import { PoopService } from '../services/PoopService';

@JsonController()
export class AuthController {

  @Post('/poop')
  async signIn(
    @CurrentUser({ required: true }) user: User,
  ) {
    return new PoopService().create(user);
  }

}
