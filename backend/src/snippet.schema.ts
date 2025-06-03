import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SnippetDocument = HydratedDocument<Snippet>;

@Schema({ timestamps: true })
export class Snippet {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  summary: string;
}

export const SnippetSchema = SchemaFactory.createForClass(Snippet);
