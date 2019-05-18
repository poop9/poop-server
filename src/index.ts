import app from './app';
import * as database from './database';
import socketIo = require('socket.io');
// const HOST: string = process.env.HOST || 'localhost';
const PORT: number = Number(process.env.PORT) || 3000;

async function startApplication() {
  try {
    // 데이터베이스 연결
    await database.connect();
    console.log(`database is connected successfully`);
    // 어플리케이션 실행
    await app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}!`);
    });
  } catch (e) {
    console.error(`Server has fatal error: ${e}`);
  }
}

// 서버 실행
startApplication();
const http = require('http').Server(app);
http.listen(3001);
const io = socketIo(http);

io.on('connection', (socket: socketIo.Socket) => {
  socket.on('message', (msg: string) => {
    socket.emit('message', msg);
  });
});
