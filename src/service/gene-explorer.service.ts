import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {GlobalService} from './global.service';

@Injectable({
  providedIn: 'root'
})
export class GeneExplorerService {
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

  getSamplesImg(body: any) {
    return this.api.post(this.glService.getGeneImg, body)
  }

  getSamplesImgSlr(body: any) {
    return this.api.post(this.glService.getGeneImgSlr, body)
  }

  getSamplesImgScr(body: any) {
    return this.api.post(this.glService.getGeneImgScr, body)
  }
}
