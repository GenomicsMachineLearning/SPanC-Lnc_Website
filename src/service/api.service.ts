import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpResponse, HttpUrlEncodingCodec} from '@angular/common/http';
import {environment} from '../environments/environment';
import {CustomHttpParamEncoder} from "./CustomHttpCodec";
import {Observable } from "rxjs";
import {catchError, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  get(url: string, body: any) {
    if (body) {
      const params = new HttpParams({
        encoder: new CustomHttpParamEncoder(),
        fromObject: body
      });
      return this.http.get(environment.apiBaseURL + '' + url, {params})
    } else {
      return this.http.get(environment.apiBaseURL + '' + url)
    }
  }

  // Add this new method for blob responses
  getBlob(url: string, body: any): Observable<Blob> {
    if (body) {
      const params = new HttpParams({
        encoder: new CustomHttpParamEncoder(),
        fromObject: body
      });
      return this.http.get(environment.apiBaseURL + '' + url, {
        params,
        responseType: 'blob' // This is the key change
      });
    } else {
      return this.http.get(environment.apiBaseURL + '' + url, {
        responseType: 'blob'
      });
    }
  }

  // Check content returned and either handle blob or JSON.
  getBlobOrJson(url: string, body: any): Observable<Blob> {
    const params = this.buildParams(body);

    return this.http.get(environment.apiBaseURL + '' + url, {
      params,
      observe: 'response',
      responseType: 'blob'
    }).pipe(
      switchMap((response: HttpResponse<Blob>) => {
        const contentType = response.headers.get('content-type');

        if (this.isImageResponse(contentType)) {
          return this.handleImageResponse(response.body!);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return this.handleJsonErrorResponse(error);
      })
    );
  }

  private buildParams(body: any): HttpParams | undefined {
    return body ? new HttpParams({
      encoder: new CustomHttpParamEncoder(),
      fromObject: body
    }) : undefined;
  }

  private isImageResponse(contentType: string | null): boolean {
    return contentType !== null && contentType.includes('image/');
  }

  private handleImageResponse(blob: Blob): Observable<Blob> {
    return new Observable<Blob>(observer => {
      observer.next(blob);
      observer.complete();
    });
  }

  private handleJsonErrorResponse(error: HttpErrorResponse): Observable<Blob> {
    return new Observable<Blob>(observer => {
      // When responseType is 'blob', even error responses are blobs
      if (error.error instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const errorData = JSON.parse(reader.result as string);
            observer.error({
              status: error.status,
              error: errorData
            });
          } catch (e) {
            observer.error({
              status: error.status,
              error: { error: 'Unknown error occurred' }
            });
          }
        };
        reader.onerror = () => {
          observer.error({
            status: error.status,
            error: { error: 'Failed to read error response' }
          });
        };
        reader.readAsText(error.error);
      } else {
        // Fallback for non-blob errors (network issues, etc.)
        observer.error({
          status: error.status,
          error: { error: error.message || 'Network error occurred' }
        });
      }
    });
  }

  post(url: string, body: any) {
    return this.http.post(`${environment.apiBaseURL}${url}`, body)
  }

  update(url: string, body: any) {
    return this.http.put(`${environment.apiBaseURL}${url}`, body)
  }


}
