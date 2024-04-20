import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }
  public Current_Module:string='user'
  public Role_Code_User:string='user'
  public Role_Code_Admin:string='admin'

  // Api Routes URL
  // Api URL for get GeneDetail
  public getGeneExplorer:string='/genes_list' 
  public getGeneList:string='/genesid' 
  public getGeneImg:string='/genes' 
  public getGeneImgSlr:string = '/genesSlr'
  public getGeneImgScr:string = '/genesScr'
}
