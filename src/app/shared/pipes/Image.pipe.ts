import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cloudinary'
})
export class ImagePipe implements PipeTransform {
  transform(value: string): string {
    const cloudinaryUrl = 'https://res.cloudinary.com/iyikuyoro/image/upload/v1560172809/turin/';

    return `${cloudinaryUrl}${value}`;
  }
}
