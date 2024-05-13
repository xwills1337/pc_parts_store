import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService } from '../../сore/services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class Drive {
  public name: string = "";
  public capacity: number = 0;
  public cache: number = 0;
  public rotationSpeed: number = 0;
  public dataTransferRate: number = 0;
  constructor (name: string, capacity: number, cache: number, rotation_speed: number, dataTransferRate: number) {
    this.name = name;
    this.capacity = capacity;
    this.cache = cache;
    this.rotationSpeed = rotation_speed;
    this.dataTransferRate = dataTransferRate;
  }
}

@Component({
  selector: 'app-drives',
  templateUrl: './drives.component.html',
  styleUrl: './drives.component.css'
})
export class DrivesComponent implements AfterViewInit, OnInit {
  drives: Drive[] = [];
  updatingId: number = -1;

  constructor (private elementRef: ElementRef, private dataService: DataService<Drive> ) {}

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    capacity: new FormControl(0, Validators.required),
    cache: new FormControl(0, Validators.required),
    rotationSpeed: new FormControl(0, Validators.required),
    dataTransferRate: new FormControl(0, Validators.required)
  });

  clearForm(): void {
    this.updatingId = -1;
    this.form.setValue({
      "name": '',
      "capacity": '',
      "cache": '',
      "rotation_speed": '',
      "data_transfer_rate": ''
    });
  }

  updateDrive(id: number): void {
    console.log(`Drive ${this.drives[id]} has been updated.`);
    this.updatingId = id;
    this.form.setValue({
      "name": this.drives[id].name,
      "capacity": this.drives[id].capacity,
      "cache": this.drives[id].cache,
      "rotation_speed": this.drives[id].rotationSpeed,
      "data_transfer_rate": this.drives[id].dataTransferRate
    });
    this.dataService.saveProduct('drives', this.drives);
  }

  deleteDrive(id: number): void {
    console.log(`Drive ${this.drives[id]} has been deleted.`);
    this.drives.splice(id, 1);
    this.dataService.saveProduct('drives', this.drives);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F5FEFD';
  }

  ngOnInit(): void {
    this.dataService.getProduct('assets/drives.json', 'drives')
    .pipe(
      filter(data => data != null),
      map((data => (data.map(drive => ({...drive})))))
    )
    .subscribe((drives) => {
        this.drives = drives;
        let exists = localStorage.getItem('drives');
        if (exists == null) {
          let dataString: string = JSON.stringify(this.drives);
          localStorage.setItem('drives', dataString);
        }
    });
  }

  onSubmit(): void {
    const value = this.form.value;
    if (this.updatingId == -1)
      this.drives.push(new Drive(value.name, value.capacity, value.cache, value.rotation_speed, value.data_transfer_rate));
    else
      this.drives[this.updatingId] = new Drive(value.name, value.capacity, value.cache, value.rotation_speed, value.data_transfer_rate);
    this.clearForm();
    this.dataService.saveProduct('drives', this.drives);
  }

  onNameChange(): void {
    console.log(`Drive ${this.drives[-1]} has been added.`);
  }
}
