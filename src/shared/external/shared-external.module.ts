// src/shared/external/shared-external.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GoogleDriveAdapter } from './adapters/google-drive.adapter';
import { FileUploadService } from './services/file-upload.service';

@Module({
  imports: [HttpModule],
  providers: [GoogleDriveAdapter, FileUploadService],
  exports: [FileUploadService],
})
export class SharedExternalModule {}
