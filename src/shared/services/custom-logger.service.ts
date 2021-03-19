import { LoggerService } from '@nestjs/common';

export class CustomLogger implements LoggerService {
  error(message: string) {
    console.log(message);
  }
  warn(message: string) {
    console.log(message);
  }
  debug?(message: string) {
    console.log(message);
  }
  verbose?(message: string) {
    console.log(message);
  }
  log(message: string) {
    console.log(message);
  }
}
