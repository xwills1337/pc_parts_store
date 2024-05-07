import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService, Drive } from '../../сore/services/data.service';

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
  selector: 'app-drives',
  templateUrl: './drives.component.html',
  styleUrl: './drives.component.css'
})
export class DrivesComponent implements AfterViewInit {
  constructor (private elementRef: ElementRef, private dataService: DataService ) {}
  users: User[] = [];
  att1 = '';
  att2 = '';
  att3 = '';
  att4 = '';
  att5 = '';
  drives: Drive[] = [];

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F5FEFD';
  }

  ngOnInit(): void {
    this.dataService.getDrives()
    .pipe(
      filter(data => data != null),
      map((data => (data.map(drive => ({...drive})))))
    )
    .subscribe((drives) => {
        this.drives = drives;
    })

  }

  onNameChange(): void {
    console.log('Что-то изменилось в DevicesComponent ')
  }
}
