import jsonwebtoken from 'jsonwebtoken';

export interface AuthModel {
  uuid: string;
  nickname: string;
}

export class AuthHelper {

  static generate(info: AuthModel) {
    const privateKey: string = process.env.JWT_SECRET || '';
    return jsonwebtoken.sign(info, privateKey, {
      expiresIn: '30d',
    });
  }

  static extract(token: string): AuthModel | null {
    return <AuthModel | null>jsonwebtoken.decode(token);
  }

}
