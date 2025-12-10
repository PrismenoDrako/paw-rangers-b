import bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { PasswordHasher } from '../../domain/services/password-hasher.interface';

@Injectable()
export class BcryptPasswordHasher implements PasswordHasher {
  async hash(plain: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plain, salt);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
