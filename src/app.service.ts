import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '¡Api de PawRangers Funcionando correctamente!';
  }
}