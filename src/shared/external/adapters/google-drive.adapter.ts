import * as FormData from 'form-data';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GoogleDriveAdapter {
  constructor(private readonly httpService: HttpService) { }

  async uploadImage(image: any): Promise<string> {
    const formData = new FormData();
    formData.append('file', image.buffer, image.originalname);
    const response = await lastValueFrom(
      this.httpService.post(process.env.LINK_API_DRIVE, formData, {
        headers: formData.getHeaders(),
      }),
    );
    if (response.data && response.data.data) {
      return response.data.data;
    }
    throw new Error('Error al subir la imagen');
  }
}
