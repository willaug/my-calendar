import { Component } from '@angular/core';
import { fadeInAnimation } from '@core/animations/fade-in.animation';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AnyObject } from '../../../../../core/interfaces/index';

@Component({
  selector: 'app-dialog-upload-picture',
  templateUrl: './dialog-upload-picture.component.html',
  styleUrls: ['./dialog-upload-picture.component.scss'],
  animations: [fadeInAnimation],
})
export class DialogUploadPictureComponent {
  public selectedImage?: Blob;
  public uploadErrors: AnyObject;
  public savingPicture: boolean;
  public imageChangedEvent: any;
  public loadedImage: boolean;

  public constructor() {
    this.uploadErrors = {};
    this.loadedImage = false;
    this.savingPicture = false;
  }

  public hidePicture(): void {
    this.loadedImage = false;
  }

  public photoChangeEvent(event: any): void {
    if (!event.target?.files[0]) return;
    this.uploadErrors = {};

    const { type, size } = event.target?.files[0] as File;
    const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
    const maximumSizeAccepted = 2 * 1024 * 1024;

    if (!acceptedFormats.includes(type)) {
      this.uploadErrors['format'] = true;
      return;
    }

    if (size > maximumSizeAccepted) {
      this.uploadErrors['size'] = true;
      return;
    }

    this.loadedImage = true;
    this.imageChangedEvent = event;
  }

  public async imageCropped(event: ImageCroppedEvent): Promise<void> {
    if (event.base64) {
      this.selectedImage = await this.base64toBlob(event.base64);
    }
  }

  private async base64toBlob(image: string): Promise<Blob> {
    return fetch(image)
      .then((response) => response.blob());
  }
}
