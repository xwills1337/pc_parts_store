import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService, Monitor } from '../../сore/services/data.service';

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
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrl: './monitors.component.css'
})

export class MonitorsComponent implements AfterViewInit {
  constructor (private elementRef: ElementRef, private dataService: DataService ) {}
  users: User[] = [];
  att1 = '';
  att2 = '';
  att3 = '';
  att4 = '';
  att5 = '';
  monitors: Monitor[] = [];

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F5FEFD';
  }

  ngOnInit(): void {
    this.dataService.getMonitors()
    .pipe(
      filter(data => data != null),
      map((data => (data.map(monitor => ({...monitor})))))
    )
    .subscribe((monitors) => {
        this.monitors = monitors;
    })

  }

  onNameChange(): void {
    console.log('Что-то изменилось в DevicesComponent ')
  }
}
