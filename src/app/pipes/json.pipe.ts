import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'json',
  standalone: true
})
export class JsonPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(value: unknown): unknown {
    return JSON.stringify(value, null, 2)
    .replace(/ /g, '&nbsp;') // note the usage of `/ /g` instead of `' '` in order to replace all occurences
    .replace(/\n/g, '<br/>'); // same here
  }
}
