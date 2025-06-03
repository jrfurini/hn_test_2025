import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnippetModule } from './snippet.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/house_numbers',
    ),
    SnippetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
