import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService, Product } from '../../сore/services/data.service';

@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrl: './monitors.component.css'
})

export class MonitorsComponent implements AfterViewInit, OnInit {
  monitors: Product[] = [];

  constructor (private elementRef: ElementRef, private dataService: DataService ) {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F5FEFD';
  }

  ngOnInit(): void {
    this.dataService.getProduct('assets/monitors.json')
    .pipe(
      filter(data => data != null),
      map((data => (data.map(monitor => ({...monitor})))))
    )
    .subscribe((monitors) => {
        this.monitors = monitors;
    });
  }

  onNameChange(): void {
    console.log('New monitor has been added.');
  }
}
