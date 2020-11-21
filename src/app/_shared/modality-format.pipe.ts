import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'modalityFormatPipe' })
export class ModalityFormatPipe implements PipeTransform {
    transform(value: string): string {
        return (value == 'Triatlon') ? 'Triatlón' : 'Duatlón';
    }
}