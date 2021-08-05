import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[numbersOnly]'
})
export class NumberDirective {

    regexStr = '^[0-9]+$'
    constructor(private el: ElementRef){        
        console.log("constructor triggered", el);
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: any){        
        return new RegExp(this.regexStr).test(event.key) || event.key == '.' || event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37 || event.keyCode == 39;        
    }

}