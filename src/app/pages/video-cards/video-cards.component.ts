import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService } from '../../сore/services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class VideoCard {
  public name: string = "";
  public graphic_processor: string = "";
  public frequency: number = 0;
  public vram: number = 0;
  public outputs: string = "";
  constructor (name: string, graphic_processor: string, frequency: number, vram: number, outputs: string) {
    this.name = name;
    this.graphic_processor = graphic_processor;
    this.frequency = frequency;
    this.vram = vram;
    this.outputs = outputs;
  }
}

@Component({
  selector: 'app-video-cards',
  templateUrl: './video-cards.component.html',
  styleUrl: './video-cards.component.css'
})
export class VideoCardsComponent implements AfterViewInit, OnInit {
  videoCards: VideoCard[] = [];
  updating_id: number = -1;

  constructor (private elementRef: ElementRef, private dataService: DataService<VideoCard> ) {}

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    graphic_processor: new FormControl('', Validators.required),
    frequency: new FormControl(0, Validators.required),
    vram: new FormControl(0, Validators.required),
    outputs: new FormControl('', Validators.required)
  });

  clearForm(): void {
    this.updating_id = -1;
    this.form.setValue({
      "name": '',
      "graphic_processor": '',
      "frequency": '',
      "vram": '',
      "outputs": ''
    });
  }

  updateVideoCard(id: number): void {
    this.updating_id = id;
    this.form.setValue({
      "name": this.videoCards[id].name,
      "graphic_processor": this.videoCards[id].graphic_processor,
      "frequency": this.videoCards[id].frequency,
      "vram": this.videoCards[id].vram,
      "outputs": this.videoCards[id].outputs
    });
  }

  deleteVideoCard(id: number): void {
    this.videoCards.splice(id, 1);
  }

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

  onSubmit(): void {
    const value = this.form.value;
    if (this.updating_id == -1)
      this.videoCards.push(new VideoCard(value.name, value.graphic_processor, value.frequency, value.vram, value.outputs));
    else
      this.videoCards[this.updating_id] = new VideoCard(value.name, value.graphic_processor, value.frequency, value.vram, value.outputs);
    this.clearForm();
  }

  onNameChange(): void {
    console.log('New video card has been added.');
  }
}