import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeFormatPipe' })
export class TimeFormatPipe implements PipeTransform {
    transform(value: string): string {
        return (value != undefined) ? value.substring(0, 2) + ":" + value.substring(2, 4) + ":" + value.substring(4, 6) : '-';
    }
}