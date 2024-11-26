import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  // Api Routes URL
  // Api URL for get GeneDetail
  public getGeneExplorer:string='/genes_list'
  public getGeneList:string='/genesid'
  public getGeneImg:string='/genes'
  public getGeneImgSlr:string = '/genesSlr'
  public getGeneImgScr:string = '/genesScr'
}
