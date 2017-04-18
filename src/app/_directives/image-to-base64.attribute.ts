import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({ selector: '[imageToBase64]' })
export class ImageToBase64Directive {
    private fileReader = new FileReader();
    files: any[] = [];
    @Output() complete: EventEmitter<any> = new EventEmitter();

    constructor(private el: ElementRef) {
        this.fileReader.addEventListener('load', (event) => {
            // var dataUrl = event.target.result;
            // console.log(dataUrl);
            // var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
            // this.complete.next(base64Data);
        });
    }

    @HostListener('change') onChange() {
        console.log(this.el.nativeElement);
        let files =  Array.from(this.el.nativeElement.files);
        let file = files[0];

        // this.fileReader.readAsDataURL(file);
    }
}
