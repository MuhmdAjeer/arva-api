import { Prop, PropOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export const Required = () => Prop({ required: true });

export const Ref = (ref: string) =>
  Prop({ type: mongoose.Schema.Types.ObjectId, ref, required: true });
