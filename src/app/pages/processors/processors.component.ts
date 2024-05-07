import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService, Processor } from '../../сore/services/data.service';

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
  selector: 'app-processors',
  templateUrl: './processors.component.html',
  styleUrl: './processors.component.css'
})
export class ProcessorsComponent implements AfterViewInit {
  constructor (private elementRef: ElementRef, private dataService: DataService ) {}
  users: User[] = [];
  att1 = '';
  att2 = '';
  att3 = '';
  att4 = '';
  att5 = '';
  processors: Processor[] = [];

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F5FEFD';
  }

  ngOnInit(): void {
    this.dataService.getProcessors()
    .pipe(
      filter(data => data != null),
      map((data => (data.map(processor => ({...processor})))))
    )
    .subscribe((processors) => {
        this.processors = processors;
    })

  }

  onNameChange(): void {
    console.log('Что-то изменилось в DevicesComponent ')
  }
}
