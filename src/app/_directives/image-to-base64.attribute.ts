import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({ selector: '[imageToBase64]' })
export class ImageToBase64Directive {
    public files: any[] = [];
    @Output()
    public complete: EventEmitter<any> = new EventEmitter();

    private fileReader = new FileReader();

    constructor(private el: ElementRef) {
        this.fileReader.addEventListener('load', (event) => {
            // var dataUrl = event.target.result;
            // console.log(dataUrl);
            // var base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
            // this.complete.next(base64Data);
        });
    }

    @HostListener('change')
    public onChange() {
        console.log(this.el.nativeElement);
        let files =  Array.from(this.el.nativeElement.files);
        let file = files[0];

        // this.fileReader.readAsDataURL(file);
    }
}
