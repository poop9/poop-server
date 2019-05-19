import { Authorized, CurrentUser, Get, JsonController, Post } from 'routing-controllers';
import { User } from '../models/User';
import { PoopService } from '../services/PoopService';

@JsonController()
export class AuthController {
  @Authorized()
  @Post('/poop')
  async poop(
    @CurrentUser({ required: true }) user: User,
  ) {
    return new PoopService().create(user);
  }
  @Authorized()
  @Get('/today')
  async today(
    @CurrentUser({ required: true }) user: User,
  ) {
    const count = await new PoopService().getTodayPoopByUser(user);
    return {
      result: { count },
    };
  }
  @Authorized()
  @Get('/week')
  async week(
    @CurrentUser({ required: true }) user: User,
  ) {
    const count = await new PoopService().getTodayPoopByUser(user);
    return {
      result: { count },
    };
  }
  @Authorized()
  @Get('/month')
  async month(
    @CurrentUser({ required: true }) user: User,
  ) {
    const count = await new PoopService().getTodayPoopByUser(user);
    return {
      result: { count },
    };
  }
  @Authorized()
  @Get('/list')
  async list() {
    return new PoopService().getList();
  }
  @Authorized()
  @Get('/lastGeo')
  async last() {
    return new PoopService().getLast();
  }
}
