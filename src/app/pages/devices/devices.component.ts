import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService, Device } from '../../сore/services/data.service';

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
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css'
})
export class DevicesComponent implements AfterViewInit, OnInit {
  constructor (private elementRef: ElementRef, private dataService: DataService ) {}
  users: User[] = [];
  att1 = '';
  att2 = '';
  att3 = '';
  att4 = '';
  att5 = '';
  devices: Device[] = [];

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F5FEFD';
  }

  ngOnInit(): void {
    this.dataService.getDevices()
    .pipe(
      filter(data => data != null),
      map((data => (data.map(device => ({...device})))))
    )
    .subscribe((devices) => {
        this.devices = devices;
    })

  }

  onNameChange(): void {
    console.log('Что-то изменилось в DevicesComponent ')
  }

}
