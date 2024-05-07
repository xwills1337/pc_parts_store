import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService, VideoCard } from '../../сore/services/data.service';

// Class User for adding new product
export class User {
  constructor(
    public att1: string,
    public att2: string,
    public att3: string,
    public att4: string,
    public att5: string,
  ){}
}

@Component({
  selector: 'app-video-cards',
  templateUrl: './video-cards.component.html',
  styleUrl: './video-cards.component.css'
})
export class VideoCardsComponent implements AfterViewInit {
  constructor (private elementRef: ElementRef, private dataService: DataService ) {}
  users: User[] = [];
  att1 = '';
  att2 = '';
  att3 = '';
  att4 = '';
  att5 = '';
  videoCards: VideoCard[] = [];

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F5FEFD';
  }

  ngOnInit(): void {
    this.dataService.getVideoCards()
    .pipe(
      filter(data => data != null),
      map((data => (data.map(videoCard => ({...videoCard})))))
    )
    .subscribe((videoCards) => {
        this.videoCards = videoCards;
    })

  }

  onNameChange(): void {
    console.log('Что-то изменилось в DevicesComponent ')
  }
}