import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService } from '../../сore/services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class Processor {
  public name: string = "";
  public socket: string = "";
  public cores: number = 0;
  public frequency: number = 0;
  public turbo_frequency: number = 0;
  constructor (name: string, socket: string, cores: number, frequency: number, turbo_frequency: number) {
    this.name = name;
    this.socket = socket;
    this.cores = cores;
    this.frequency = frequency;
    this.turbo_frequency = turbo_frequency;
  }
}

@Component({
  selector: 'app-processors',
  templateUrl: './processors.component.html',
  styleUrl: './processors.component.css'
})
export class ProcessorsComponent implements AfterViewInit, OnInit {
  processors: Processor[] = [];
  updating_id: number = -1;

  constructor (private elementRef: ElementRef, private dataService: DataService<Processor>) {}

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    socket: new FormControl('', Validators.required),
    cores: new FormControl(0, Validators.required),
    frequency: new FormControl(0, Validators.required),
    turbo_frequency: new FormControl(0, Validators.required)
  });

  clearForm(): void {
    this.updating_id = -1;
    this.form.setValue({
      "name": '',
      "socket": '',
      "cores": '',
      "frequency": '',
      "turbo_frequency": ''
    });
  }

  updateProcessor(id: number): void {
    this.updating_id = id;
    this.form.setValue({
      "name": this.processors[id].name,
      "socket": this.processors[id].socket,
      "cores": this.processors[id].cores,
      "frequency": this.processors[id].frequency,
      "turbo_frequency": this.processors[id].turbo_frequency
    });
  }

  deleteProcessor(id: number): void {
    this.processors.splice(id, 1);
  }

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

  onSubmit(): void {
    const value = this.form.value;
    if (this.updating_id == -1)
      this.processors.push(new Processor(value.name, value.socket, value.cores, value.frequency, value.turbo_frequency));
    else
      this.processors[this.updating_id] = new Processor(value.name, value.socket, value.cores, value.frequency, value.turbo_frequency);
    this.clearForm();
  }

  onNameChange(): void {
    console.log('New processor has been added.');
  }
}
