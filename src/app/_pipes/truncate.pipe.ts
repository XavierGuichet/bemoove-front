import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myTruncate'
})

export class MyTruncatePipe implements PipeTransform {
    public transform(value: string, arg1: string, arg2: string, arg3: string) {
        let indexStart = arg1 ? parseInt(arg1, 10) : 0;
        let indexEnd = arg2 ? parseInt(arg2, 10) : value.length;
        let trail = arg3 ? arg3 : '...';
        if ( indexStart !== 0 ) {
            return value.substring(indexStart, indexEnd) + trail;
        } else {
            return value.length > indexEnd ? value.substring(indexStart, indexEnd) + trail : value;
        }
    }
}
