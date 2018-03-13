import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myTime'
})
export class MyTimePipe implements PipeTransform {
    public transform(value: number, format: string): string {
        let hh = this.pad(2, Math.floor(value / 60).toString(), '0');
        let mm = this.pad(2, Math.floor(value % 60).toString(), '0');

        format = format || 'hh:mm';

        return format.replace(/hh/, hh).replace(/mm/, mm);
    }

    private pad(width, string, padding) {
        return (width <= string.length) ? string : this.pad(width, padding + string, padding)
    }
}
