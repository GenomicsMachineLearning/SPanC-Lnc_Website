import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpUrlEncodingCodec} from '@angular/common/http';
import {environment} from '../environments/environment';
import {CustomHttpParamEncoder} from "./CustomHttpCodec";

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

  post(url: string, body: any) {
    return this.http.post(`${environment.apiBaseURL}${url}`, body)
  }

  update(url: string, body: any) {
    return this.http.put(`${environment.apiBaseURL}${url}`, body)
  }


}
