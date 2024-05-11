import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService } from '../../сore/services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class Drive {
  public name: string = "";
  public capacity: number = 0;
  public cache: number = 0;
  public rotation_speed: number = 0;
  public data_transfer_rate: number = 0;
  constructor (name: string, capacity: number, cache: number, rotation_speed: number, data_transfer_rate: number) {
    this.name = name;
    this.capacity = capacity;
    this.cache = cache;
    this.rotation_speed = rotation_speed;
    this.data_transfer_rate = data_transfer_rate;
  }
}

@Component({
  selector: 'app-drives',
  templateUrl: './drives.component.html',
  styleUrl: './drives.component.css'
})
export class DrivesComponent implements AfterViewInit, OnInit {
  drives: Drive[] = [];
  updating_id: number = -1;

  constructor (private elementRef: ElementRef, private dataService: DataService<Drive> ) {}

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    capacity: new FormControl(0, Validators.required),
    cache: new FormControl(0, Validators.required),
    rotation_speed: new FormControl(0, Validators.required),
    data_transfer_rate: new FormControl(0, Validators.required)
  });

  clearForm(): void {
    this.updating_id = -1;
    this.form.setValue({
      "name": '',
      "capacity": '',
      "cache": '',
      "rotation_speed": '',
      "data_transfer_rate": ''
    });
  }

  updateDrive(id: number): void {
    this.updating_id = id;
    this.form.setValue({
      "name": this.drives[id].name,
      "capacity": this.drives[id].capacity,
      "cache": this.drives[id].cache,
      "rotation_speed": this.drives[id].rotation_speed,
      "data_transfer_rate": this.drives[id].data_transfer_rate
    });
  }

  deleteDrive(id: number): void {
    this.drives.splice(id, 1);
  }

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

  onSubmit(): void {
    const value = this.form.value;
    if (this.updating_id == -1)
      this.drives.push(new Drive(value.name, value.capacity, value.cache, value.rotation_speed, value.data_transfer_rate));
    else
      this.drives[this.updating_id] = new Drive(value.name, value.capacity, value.cache, value.rotation_speed, value.data_transfer_rate);
    this.clearForm();
  }

  onNameChange(): void {
    console.log('New drive has been added.');
  }
}
