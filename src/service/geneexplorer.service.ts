import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {GlobalService} from './global.service';

@Injectable({
  providedIn: 'root'
})
export class GeneexplorerService {
  public constructor(
    private api: ApiService,
    private glService: GlobalService
  ) {
  }

  getGeneExplorerList(params: any) {
    return this.api.get(this.glService.getGeneExplorer, params)
  }

  getGeneNameList(body: any = null) {
    return this.api.get(this.glService.getGeneList, body)
  }

  getsamplesImg(body: any) {
    return this.api.post(this.glService.getGeneImg, body)
  }

  getsamplesImgSlr(body: any) {
    return this.api.post(this.glService.getGeneImgSlr, body)
  }

  getsamplesImgScr(body: any) {
    return this.api.post(this.glService.getGeneImgScr, body)
  }
}
