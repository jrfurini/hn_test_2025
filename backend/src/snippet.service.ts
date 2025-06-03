import { InjectModel } from '@nestjs/mongoose';
import { SnippetDocument } from './snippet.schema';
import { Model } from 'mongoose';
import { Snippet } from './snippet.schema';
import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class SnippetService {
  private readonly logger = new Logger(SnippetService.name);
  private readonly openai: OpenAI;

  constructor(
    @InjectModel(Snippet.name) private snippetModel: Model<SnippetDocument>,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async create(text: string): Promise<Snippet> {
    let summary = '';
    try {
      const completion = await this.openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Summarize the following text in up to 30 words.',
          },
          { role: 'user', content: text },
        ],
        max_tokens: 60,
      });
      summary = completion.choices[0].message?.content?.trim() || '';
    } catch (error) {
      this.logger.error('Error generating summary with OpenAI', error);
      summary = '';
    }

    const snippet = new this.snippetModel({ text, summary });
    return snippet.save();
  }

  async findById(id: string): Promise<Snippet | null> {
    try {
      return await this.snippetModel.findById(id).exec();
    } catch (error) {
      this.logger.error(`Error fetching snippet by id: ${id}`, error);
      return null;
    }
  }
}
