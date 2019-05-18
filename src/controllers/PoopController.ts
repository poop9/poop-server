import { CurrentUser, Get, JsonController, Post } from 'routing-controllers';
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

  @Get('/today')
  async today(
    @CurrentUser({ required: true }) user: User,
  ) {
    return new PoopService().getTodayPoopByUser(user);
  }

  @Get('/week')
  async week(
    @CurrentUser({ required: true }) user: User,
  ) {
    return new PoopService().getTodayPoopByUser(user);
  }

  @Get('/month')
  async month(
    @CurrentUser({ required: true }) user: User,
  ) {
    return new PoopService().getTodayPoopByUser(user);
  }

  @Get('/list')
  async list() {
    return new PoopService().getList();
  }
}
