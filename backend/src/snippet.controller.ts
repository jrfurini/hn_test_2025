import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import { Snippet } from './snippet.schema';

@Controller()
export class SnippetController {
  constructor(private readonly snippetService: SnippetService) {}

  @Get('/snippets/:id')
  getSnippet(@Param('id') id: string): Promise<Snippet | null> {
    return this.snippetService.findById(id);
  }

  @Post('/snippets')
  createSnippet(@Body() createSnippetDto: { text: string }): Promise<Snippet> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    return this.snippetService.create(createSnippetDto.text);
  }
}
