import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'typeformatPipe' })
export class TypeFormatPipe implements PipeTransform {
    transform(value: string): string {
        if (value == '') return '-';
        return (value == 'Olimpico') ? 'Olímpico' : value;
    }
}