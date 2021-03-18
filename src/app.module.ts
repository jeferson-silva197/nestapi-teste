import { Module } from '@nestjs/common';
import { BackofficeModule } from './modules/backoffice/backoffice.module';

@Module({
  imports: [BackofficeModule],
})
export class AppModule {}
