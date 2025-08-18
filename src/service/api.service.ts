import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpUrlEncodingCodec} from '@angular/common/http';
import {environment} from '../environments/environment';
import {CustomHttpParamEncoder} from "./CustomHttpCodec";
import {Observable} from "rxjs";

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

  post(url: string, body: any) {
    return this.http.post(`${environment.apiBaseURL}${url}`, body)
  }

  update(url: string, body: any) {
    return this.http.put(`${environment.apiBaseURL}${url}`, body)
  }


}
