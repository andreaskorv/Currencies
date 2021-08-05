import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private currenciesUrl = "https://api.frankfurter.app/currencies";
  private currencyTableUrl = "https://api.frankfurter.app/latest";
  private periodTableUrl = "https://api.frankfurter.app/";

  constructor(
    private http: HttpClient
  ) { 

  }

  getCurrencies(): Observable<any> {
    return this.http.get<any>(this.currenciesUrl)
      .pipe(
        catchError(this.handleError<any>('getCurrencies', []))
      );
  }

  getCurrencyRates(currency: string) {
    return this.http.get<any>(this.currencyTableUrl + "?from=" + currency)
      .pipe(
        catchError(this.handleError<any>('getCurrencyRates', []))
      );
  }

  getPeriodTable(forCompare: string,
    forTo: string,
    start: string,
    end: string) {
      return this.http.get<any>(this.periodTableUrl + start + ".." + end + "?from=" + forCompare + "&to=" + forTo)
      .pipe(
        catchError(this.handleError<any>('getPeriodTable', []))
      );
    }
  
  getConvertation(forFrom: string,
    forTo: string,
    forAmount: string) {
      return this.http.get<any>(this.currencyTableUrl + "?amount=" + forAmount + "&from=" + forFrom + "&to=" + forTo)
      .pipe(
        catchError(this.handleError<any>('getConvertation', []))
      );
    }
  
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
