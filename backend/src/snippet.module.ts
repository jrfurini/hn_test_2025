// snippet.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Snippet, SnippetSchema } from './snippet.schema';
import { SnippetService } from './snippet.service';
import { SnippetController } from './snippet.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Snippet.name, schema: SnippetSchema }]),
  ],
  controllers: [SnippetController],
  providers: [SnippetService],
})
export class SnippetModule {}
