import { FileContent } from '../types/file-content';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AbstractStorage {
  getFile(path: string): FileContent {
    throw new Error('unimplemented');
  }
}
