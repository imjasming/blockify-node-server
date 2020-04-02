import { Document } from 'mongoose';

export interface TemplateSchema extends Document{
  id: number;
  name: string;
  createTime: string;
  updateTime: string;
  files: string;
}
