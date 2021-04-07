import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste'
  ];
  constructor() { }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    if (
      this.navigationKeys.indexOf(e.key) > -1 || 
      (e.key === 'a' && e.ctrlKey === true) || 
      (e.key === 'c' && e.ctrlKey === true) ||
      (e.key === 'v' && e.ctrlKey === true) || 
      (e.key === 'x' && e.ctrlKey === true) || 
      (e.key === 'a' && e.metaKey === true) || 
      (e.key === 'c' && e.metaKey === true) || 
      (e.key === 'v' && e.metaKey === true) || 
      (e.key === 'x' && e.metaKey === true) 
    ) {
      return;  
    }
    
    if (e.key === ' ' || isNaN(Number(e.key))) {
      e.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedInput: string = event.clipboardData
      .getData('text/plain')
      .replace(/\D/g, ''); 
    document.execCommand('insertText', false, pastedInput);
  }
}
