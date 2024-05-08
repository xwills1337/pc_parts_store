import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService, Product } from '../../сore/services/data.service';

@Component({
  selector: 'app-drives',
  templateUrl: './drives.component.html',
  styleUrl: './drives.component.css'
})
export class DrivesComponent implements AfterViewInit, OnInit {
  drives: Product[] = [];

  constructor (private elementRef: ElementRef, private dataService: DataService ) {}

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F5FEFD';
  }

  ngOnInit(): void {
    this.dataService.getProduct('assets/drives.json')
    .pipe(
      filter(data => data != null),
      map((data => (data.map(drive => ({...drive})))))
    )
    .subscribe((drives) => {
        this.drives = drives;
    });
  }

  onNameChange(): void {
    console.log('New drive has been added.');
  }
}
