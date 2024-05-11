import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable,  catchError, of } from "rxjs";

@Injectable({providedIn: 'root'})
export class DataService<T> {
    constructor(private http: HttpClient) { }

    getProduct(dataPath: string): Observable<Array<T>> {
        return this.http.get<Array<T>>(dataPath)
            .pipe(
                catchError(err => {
                    console.log(err);
                    return of([]);
                })
            )
    }
}