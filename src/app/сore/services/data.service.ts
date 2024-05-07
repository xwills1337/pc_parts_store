import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable,  catchError, of } from "rxjs";

export interface Device {
    att1: string;
    att2: string;
    att3: string;
    att4: string;
    att5: string;
}

export interface Drive {
    att1: string;
    att2: string;
    att3: string;
    att4: string;
    att5: string;
}

export interface Monitor {
    att1: string;
    att2: string;
    att3: string;
    att4: string;
    att5: string;
}

export interface Processor {
    att1: string;
    att2: string;
    att3: string;
    att4: string;
    att5: string;
}

export interface VideoCard{
    att1: string;
    att2: string;
    att3: string;
    att4: string;
    att5: string;
}

@Injectable({providedIn: 'root'})
export class DataService {
    constructor(private http: HttpClient) { }

    getDevices(): Observable<Array<Device>> {
        return this.http.get<Array<Device>>('assets/devices.json')
            .pipe(
                catchError(err => {
                    console.log(err);
                    return of([]);
                })
            )
    }
    
    getDrives(): Observable<Array<Drive>> {
        return this.http.get<Array<Drive>>('assets/drives.json')
            .pipe(
                catchError(err => {
                    console.log(err);
                    return of([]);
                })
            )
    }

    getMonitors(): Observable<Array<Monitor>> {
        return this.http.get<Array<Monitor>>('assets/monitors.json')
            .pipe(
                catchError(err => {
                    console.log(err);
                    return of([]);
                })
            )
    }

    getProcessors(): Observable<Array<Processor>> {
        return this.http.get<Array<Processor>>('assets/processors.json')
            .pipe(
                catchError(err => {
                    console.log(err);
                    return of([]);
                })
            )
    }

    getVideoCards(): Observable<Array<VideoCard>> {
        return this.http.get<Array<VideoCard>>('assets/video_cards.json')
            .pipe(
                catchError(err => {
                    console.log(err);
                    return of([]);
                })
            )
    }

   
}