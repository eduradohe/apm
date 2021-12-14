import { Pipe, PipeTransform } from "@angular/core";
import { from } from "rxjs";

@Pipe({
    name: 'stringConverter'
})
export class StringConverterPipe implements PipeTransform {

    transform(from: string, value: string, as: string): string {
        return from.replace(value, as);
    }
}