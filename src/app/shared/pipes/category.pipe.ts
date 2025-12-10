import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'FRONT-END':
        return 'code';
      case 'BACK-END':
        return 'computer';
      default:
        return 'code';
    }
  }
}
