import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";
import { IProduct } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private static readonly URL = 'api/products/products.json';

    private _httpClient: HttpClient;

    constructor(http: HttpClient) {
        this._httpClient = http;
    }
    
    getProduct(id: number): Observable<IProduct | undefined> {
        return this.getProducts().pipe(
            map((products: IProduct[]) => products.find(p => p.productId === id))
          );
      }

    getProducts(): Observable<IProduct[]> {
        return this._httpClient.get<IProduct[]>(ProductService.URL).pipe(
            tap(data => console.log('All', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = this.errorMessageFrom(err);
        console.error(errorMessage);
        return throwError(errorMessage);
    }

    private errorMessageFrom(err: HttpErrorResponse): string {
        return (err.error instanceof ErrorEvent) ?
            `An error occurred: ${err.error.message}`
            :
            `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
}