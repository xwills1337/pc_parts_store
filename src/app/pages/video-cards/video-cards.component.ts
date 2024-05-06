import { AfterViewInit, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-video-cards',
  templateUrl: './video-cards.component.html',
  styleUrl: './video-cards.component.css'
})
export class VideoCardsComponent implements AfterViewInit {
  constructor (private elementRef: ElementRef) {}
  
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F5FEFD';
  }
}