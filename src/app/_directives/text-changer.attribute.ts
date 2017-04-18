import { Directive, ElementRef } from '@angular/core';

import { Observable } from 'rxjs/Rx';

@Directive({ selector: '[textChanger]' })
export class TextChangerDirective  {
    private wordslist = new Array('Yoga', 'Boxe', 'Cardio', 'Renforcement');

    private word: string;
    private nbLetterShow: number;
    private write: boolean;

    constructor(private el: ElementRef) {
        this.word =  this.wordslist[0];
        this.nbLetterShow = -1;
        this.write = true;

        Observable.interval(150).map(() => {
            return this.writeNextLetter();
        }).subscribe((message) => { this.el.nativeElement.innerHTML = message; });
    }

    private writeNextLetter() {
        let wordlength = this.word.length;
        if (this.nbLetterShow > ( wordlength + 3 )) { this.write = false; }
        if (this.nbLetterShow < 1) {
            this.write = true;
            this.wordslist.push(this.wordslist.shift());
            this.word =  this.wordslist[0];
        }
        if (this.write) {
            this.nbLetterShow = this.nbLetterShow + 1;
        } else {
            this.nbLetterShow = this.nbLetterShow - 1;
        }
        let toShow = this.word.slice(0, this.nbLetterShow) + '|';
        return toShow;
    }
}
