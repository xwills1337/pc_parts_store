import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable,  catchError, of } from "rxjs";

export interface Product {
    att1: string;
    att2: string;
    att3: string;
    att4: string;
    att5: string;
}

@Injectable({providedIn: 'root'})
export class DataService {
    constructor(private http: HttpClient) { }

    getProduct(dataPath: string): Observable<Array<Product>> {
        return this.http.get<Array<Product>>(dataPath)
            .pipe(
                catchError(err => {
                    console.log(err);
                    return of([]);
                })
            )
    }
}