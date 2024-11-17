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
      this.httpService.post('http://198.211.99.223:9000/file/upload', formData, {
        headers: formData.getHeaders(),
      }),
    );
    if (response.data && response.data.data) {
      return response.data.data;
    }
    throw new Error('Error al subir la imagen');
  }
}
