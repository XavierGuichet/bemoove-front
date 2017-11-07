import { Component, Input, Output, EventEmitter, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

import { BMImage } from '../../models/index';

@Component({
  selector: 'bm-image-input',
  templateUrl: './bm-image-input.component.html',
  styleUrls: ['./bm-image-input.component.scss']
})

export class BMImageInputComponent implements OnInit {
    @Input()
    public parent: FormGroup;

    @Input()
    public formImage: BMImage;

    @Input()
    public width: number;

    @Input()
    public height: number;

    public data: any;
    public cropperSettings: CropperSettings;

    public image: any = new Image();

    @ViewChild('cropper', undefined)
    public cropper: ImageCropperComponent;

    @Output()
    public onConfirm = new EventEmitter<BMImage>();

    public state: number = 1;
    // 1 => upload (pas d'image)
    // 2 => crop me
    // 3 => validated

    private myReader: FileReader = new FileReader();

    public ngOnInit() {
        if (this.formImage.path || this.formImage.base64data) {
            this.state = 3;
        }
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = this.width;
        this.cropperSettings.height = this.height;
        this.cropperSettings.croppedWidth = this.width;
        this.cropperSettings.croppedHeight = this.height;
        this.cropperSettings.canvasWidth = 600;
        this.cropperSettings.canvasHeight = 337;
        this.cropperSettings.keepAspect = true;
        this.cropperSettings.noFileInput = true;

        this.data = {};
    }

    public fileChangeListener($event: any) {
        // this.cropper.fileChangeListener($event); This is just a keeped idea
        if ($event.target.files.length === 0) {
            return;
        }

        let file: File = $event.target.files[0];
        if (this.cropper.settings.allowedFilesRegex.test(file.name)) {
            let image: any = new Image();
            let fileReader: FileReader = new FileReader();

            fileReader.addEventListener('loadend', (loadEvent: any) => {
                image.addEventListener('load', () => {
                    this.cropper.setImage(image);
                    this.state = 2;
                });
                image.src = loadEvent.target.result;
            });

            fileReader.readAsDataURL(file);
        }
    }

    public resetCropper() {
        this.cropper.reset();
        this.state = 1;
        if (this.formImage.path || this.formImage.base64data) {
            this.state = 3;
        }
    }

    public cropNew() {
        this.cropper.reset();
        this.state = 1;
    }

    public confirmCrop() {
        let croppedImage = new BMImage();
        croppedImage.base64data = this.data.image;
        this.onConfirm.emit(croppedImage);
        this.state = 3;
    }

    get showUpload() {
        return (this.state === 1);
    }

    get showCropper() {
        return (this.state === 2);
    }

    get showImage() {
        return (this.state === 3);
    }

    get btnshape() {
        if (!this.cropperSettings.croppedWidth) {
            return {};
        }
        let width;
        let bottom;
        if (this.cropperSettings.croppedWidth < this.cropperSettings.canvasWidth ) {
            width = this.cropperSettings.croppedWidth + 'px';
            bottom = this.cropperSettings.croppedHeight + 'px';
        } else {
            width = '100%';
            bottom = (this.cropperSettings.croppedHeight * 100 / this.cropperSettings.croppedWidth) + '%';
        }
        return {
            'width': width,
            'padding-bottom': bottom
        };
    }
}
