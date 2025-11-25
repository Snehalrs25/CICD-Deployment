import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiIntegratedService {

  constructor(private http: HttpClient) { }

  /**
   * Generic HTTP GET method for API calls
   * @param url - The API endpoint URL
   * @param headers - Optional HTTP headers
   * @returns Observable of the HTTP response
   */
  httpGetCallMethod<T>(url: string, headers?: HttpHeaders): Observable<T> {
    try {
      const httpOptions = {
        headers: headers || new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      return this.http.get<T>(url, httpOptions).pipe(
        map(response => {
          // Rule 3: Guard against null/undefined responses in service
          if (response == null || response === undefined) {
            throw new Error('API response is null or undefined');
          }
          return response;
        }),
        catchError((error) => {
          console.error('GET API call failed:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      console.error('GET method error:', error);
      return throwError(() => error);
    }
  }

  /**
   * Generic HTTP POST method for API calls
   * @param url - The API endpoint URL
   * @param body - Request body
   * @param headers - Optional HTTP headers
   * @returns Observable of the HTTP response
   */
  httpPostCallMethod<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    try {
      const httpOptions = {
        headers: headers || new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      return this.http.post<T>(url, body, httpOptions).pipe(
        catchError((error) => {
          console.error('POST API call failed:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      console.error('POST method error:', error);
      return throwError(() => error);
    }
  }

  /**
   * Generic HTTP PUT method for API calls
   * @param url - The API endpoint URL
   * @param body - Request body
   * @param headers - Optional HTTP headers
   * @returns Observable of the HTTP response
   */
  httpPutCallMethod<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    try {
      const httpOptions = {
        headers: headers || new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      return this.http.put<T>(url, body, httpOptions).pipe(
        catchError((error) => {
          console.error('PUT API call failed:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      console.error('PUT method error:', error);
      return throwError(() => error);
    }
  }

  /**
   * Generic HTTP DELETE method for API calls
   * @param url - The API endpoint URL
   * @param headers - Optional HTTP headers
   * @returns Observable of the HTTP response
   */
  httpDeleteCallMethod<T>(url: string, headers?: HttpHeaders): Observable<T> {
    try {
      const httpOptions = {
        headers: headers || new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      return this.http.delete<T>(url, httpOptions).pipe(
        catchError((error) => {
          console.error('DELETE API call failed:', error);
          return throwError(() => error);
        })
      );
    } catch (error) {
      console.error('DELETE method error:', error);
      return throwError(() => error);
    }
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}