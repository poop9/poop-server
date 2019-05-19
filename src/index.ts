import app from './app';
import * as database from './database';
import { User } from './models/User';
import { GeolocationService } from './services/GeolocationService';
import { PoopService } from './services/PoopService';
import { UserService } from './services/UserService';
import { AuthHelper } from './utils/AuthHelper';
import socketIo = require('socket.io');
// const HOST: string = process.env.HOST || 'localhost';
const PORT: number = Number(process.env.PORT) || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});

async function startApplication() {
  try {
    // 데이터베이스 연결
    await database.connect();
    console.log(`database is connected successfully`);
    // 어플리케이션 실행
    await server;
  } catch (e) {
    console.error(`Server has fatal error: ${e}`);
  }
}
// 서버 실행
startApplication();

const io = require('socket.io').listen(server);

io.on('connection', (socket: socketIo.Socket) => {
  socket.on('newmessage', async (message) => {
    const msg = message.message;
    const token = message.token;
    const authModel = AuthHelper.extract(token);
    if (authModel && (msg === 'yo!')) {

      const geolocation =  new GeolocationService().getGeolocationdByUUID(authModel.uuid);
      geolocation.then((geo) => {
        const user =  new UserService().getUser(authModel.uuid, authModel.nickname);
        user.then((user) => {
          const poop = new PoopService().create(user || new User);
          poop.then(() => {
            socket.emit('newmessage', geo);
          });
        });
      });
    }
  });
});
