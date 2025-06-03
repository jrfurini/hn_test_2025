import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { Snippet } from './snippet.schema';

@Controller()
export class SnippetController {
  constructor(private readonly snippetService: SnippetService) {}

  @Get('/snippets/:id')
  async getSnippet(@Param('id') id: string): Promise<Snippet> {
    try {
      const snippet = await this.snippetService.findById(id);
      if (!snippet) {
        throw new NotFoundException('Snippet not found');
      }
      return snippet;
    } catch (e) {
      console.error(e);
      throw new NotFoundException('Snippet not found');
    }
  }

  @Post('/snippets')
  createSnippet(@Body() createSnippetDto: { text: string }): Promise<Snippet> {
    return this.snippetService.create(createSnippetDto.text);
  }
}
