import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {GlobalService} from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AlphaGenomeService {
  public constructor(
    private api: ApiService,
    private glService: GlobalService
  ) {
  }

  getAlphaGenome(params: any) {
    return this.api.getBlob(this.glService.getAlphaGenome, params)
  }
}
