import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService, Product } from '../../сore/services/data.service';

@Component({
  selector: 'app-video-cards',
  templateUrl: './video-cards.component.html',
  styleUrl: './video-cards.component.css'
})
export class VideoCardsComponent implements AfterViewInit, OnInit {
  videoCards: Product[] = [];

  constructor (private elementRef: ElementRef, private dataService: DataService ) {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F5FEFD';
  }

  ngOnInit(): void {
    this.dataService.getProduct('assets/video_cards.json')
    .pipe(
      filter(data => data != null),
      map((data => (data.map(videoCard => ({...videoCard})))))
    )
    .subscribe((videoCards) => {
        this.videoCards = videoCards;
    });
  }

  onNameChange(): void {
    console.log('New video card has been added.');
  }
}