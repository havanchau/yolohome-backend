import { Controller, Post, UploadedFile, UseInterceptors, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { Multer } from 'multer';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image')) // image là tên của field trong form data
  async uploadImage(@UploadedFile() file: Multer.File) {
    console.log(file);
    return this.imagesService.uploadImage(file);
  }

  @Delete(':publicId')
  async deleteImage(@Param('publicId') publicId: string) {
    const result = await this.imagesService.deleteImage(publicId);
    return result;
  }
}
