import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

/**
 * Directiva que inserta HTML directamente en el DOM sin que Angular lo sanitice.
 * Usamos esto para el contenido markdown del blog donde necesitamos <img>, etc.
 * El contenido viene de nuestro propio parser (marked), no de usuarios externos.
 */
@Directive({
  selector: '[rawHtml]',
  standalone: true,
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['rawHtml'],
})
export class SafeHtmlDirective implements OnChanges {
  @Input() rawHtml = '';

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    this.el.nativeElement.innerHTML = this.rawHtml;
  }
}
