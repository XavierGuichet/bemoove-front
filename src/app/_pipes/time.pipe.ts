import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myTime'
})
export class MyTimePipe implements PipeTransform {
    public transform(value: number, format: string): string {
        let hh = Math.floor(value / 60).toString();
        let mm = Math.floor(value % 60).toString();

        format = format || 'hh:mm';

        return format.replace(/hh/, hh).replace(/mm/, mm);
    }
}
