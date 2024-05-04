import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { Multer } from 'multer';

@Injectable()
export class ImagesService {
  constructor() {
    cloudinary.v2.config({
      cloud_name: process.env.YOUR_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.YOUR_CLOUDINARY_API_KEY,
      api_secret: process.env.YOUR_CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(file: Multer.File): Promise<any> {
    const result = await cloudinary.v2.uploader.upload(file.path);
    return result;
  }

  async deleteImage(publicId: string): Promise<any> {
    const result = await cloudinary.v2.uploader.destroy(publicId);
    return result;
  }
}
