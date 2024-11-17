// src/shared/external/services/file-upload.service.ts
import { Injectable } from '@nestjs/common';
import { GoogleDriveAdapter } from '../adapters/google-drive.adapter';

@Injectable()
export class FileUploadService {
  constructor(private readonly googleDriveAdapter: GoogleDriveAdapter) {}

  async uploadLogo(image: any): Promise<string> {
    return await this.googleDriveAdapter.uploadImage(image);
  }
}
