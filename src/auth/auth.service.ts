import { Injectable } from '@nestjs/common';
import { SignInAuthDto, SignUpAuthDto } from './dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  signIn(signIn: SignInAuthDto): User {
    // TODO: remove hash from user entity
    return {
      address: 'Rua Dr emilio',
      age: 21,
      updatedAt: new Date(),
      createdAt: new Date(),
      email: `${signIn.email}`,
      hash: `${123}`,
      id: 0,
      name: 'Lazaro',
      products: [
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          id: 0,
          image: 'http://github.com/lazarok09.png',
          name: 'Iphone 15',
          price: 2500,
        },
      ],
    };
  }

  signUp(signUp: SignUpAuthDto) {
    return `This action sign up a user ${signUp}`;
  }
  signOff() {
    return `This action returns auth signoff`;
  }
}
