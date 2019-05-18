import { CurrentUser, Get, JsonController } from 'routing-controllers';
import { User } from '../models/User';
import { PoopService } from '../services/PoopService';

@JsonController()
export class AuthController {

  @Get('/day')
  async day(
    @CurrentUser({ required: true }) user: User,
  ) {
    const [, totalcount] = await new PoopService().getTodayPoopByUser(user);
    return totalcount;
  }

  @Get('/week')
  async week(
    @CurrentUser({ required: true }) user: User,
  ) {
    const [, totalcount] = await new PoopService().getWeekPoopByUser(user);
    return totalcount;
  }
  @Get('/month')
  async signIn(
    @CurrentUser({ required: true }) user: User,
  ) {
    const [, totalcount] = await new PoopService().getMonthPoopByUser(user);
    return totalcount;
  }

}
