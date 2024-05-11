import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService } from '../../сore/services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class Device {
  public name: string = "";
  public device_type: string = "";
  public connection_type: string = "";
  public weight: number = 0;
  public size: string = "";
  constructor (name: string, device_type: string, connection_type: string, weight: number, size: string) {
    this.name = name;
    this.device_type = device_type;
    this.connection_type = connection_type;
    this.weight = weight;
    this.size = size;
  }
}

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css'
})
export class DevicesComponent implements AfterViewInit, OnInit {
  devices: Device[] = [];
  updating_id: number = -1;

  constructor (private elementRef: ElementRef, private dataService: DataService<Device> ) {}

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    device_type: new FormControl('', Validators.required),
    connection_type: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required)
  });

  clearForm(): void {
    this.updating_id = -1;
    this.form.setValue({
      "name": '',
      "device_type": '',
      "connection_type": '',
      "weight": '',
      "size": ''
    });
  }

  updateDevice(id: number): void {
    this.updating_id = id;
    this.form.setValue({
      "name": this.devices[id].name,
      "device_type": this.devices[id].device_type,
      "connection_type": this.devices[id].connection_type,
      "weight": this.devices[id].weight,
      "size": this.devices[id].size
    });
  }

  deleteDevice(id: number): void {
    this.devices.splice(id, 1);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#F5FEFD';
  }

  ngOnInit(): void {
    this.dataService.getProduct('assets/devices.json')
    .pipe(
      filter(data => data != null),
      map((data => (data.map(device => ({...device})))))
    )
    .subscribe((devices) => {
        this.devices = devices;
    });
  }

  onSubmit(): void {
    const value = this.form.value;
    if (this.updating_id == -1)
      this.devices.push(new Device(value.name, value.device_type, value.connection_type, value.weight, value.size));
    else
      this.devices[this.updating_id] = new Device(value.name, value.device_type, value.connection_type, value.weight, value.size);
    this.clearForm();
  }

  onNameChange(): void {
    console.log('New device has been added.');
  }
}
