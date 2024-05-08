import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService, Product } from '../../сore/services/data.service';

@Component({
  selector: 'app-processors',
  templateUrl: './processors.component.html',
  styleUrl: './processors.component.css'
})
export class ProcessorsComponent implements AfterViewInit, OnInit {
  processors: Product[] = [];

  constructor (private elementRef: ElementRef, private dataService: DataService ) {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F5FEFD';
  }

  ngOnInit(): void {
    this.dataService.getProduct('assets/processors.json')
    .pipe(
      filter(data => data != null),
      map((data => (data.map(processor => ({...processor})))))
    )
    .subscribe((processors) => {
        this.processors = processors;
    });
  }

  onNameChange(): void {
    console.log('New processor has been added.');
  }
}
