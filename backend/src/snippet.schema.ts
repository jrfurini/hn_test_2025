import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SnippetDocument = HydratedDocument<Snippet>;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
@Schema({ timestamps: true })
export class Snippet {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Prop({ required: true })
  text: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Prop({ required: true })
  summary: string;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
export const SnippetSchema = SchemaFactory.createForClass(Snippet);
