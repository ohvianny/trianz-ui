import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'categoryFormatPipe' })
export class CategoryFormatPipe implements PipeTransform {
    transform(value: string): string {
        return (value == 'Olimpico') ? 'Olímpico' : value;
    }
}