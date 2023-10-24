import { Component, OnInit } from '@angular/core';
import { GeneexplorerService } from '../../../service/geneexplorer.service';

@Component({
  selector: 'ngx-atlas',
  templateUrl: './atlas.component.html',
  styleUrls: ['./atlas.component.scss']
})
export class AtlasComponent implements OnInit {

  public geneAtlas:any = [{name:'IGKC'},{name:'FLG'},{name:'LOR'},{name:'LCE1C'},{name:'P13'},{name:'KRT1'},{name:'LTF'},{name:'MMP'}]
  public filteredGenes:any = [];
  public filteredGenesOrg:any = [];
  // public sampleGenes:any = [{image:"assets/images/geneExporer/hnopc.jpeg",name:"Head and Neck OPSCC"}];
  public sampleGenes:any = [{"image":"assets/images/geneExporer/headaneck.jpeg","name":'Head and Neck Cancer'},{"image":"assets/images/geneExporer/Melanoma.png","name":'Melanoma'},{"image":"assets/images/geneExporer/SCC.png","name":'SCC'},{"image":"assets/images/geneExporer/BCC.png","name":'BCC'}]
  // public sampleGenes:any = [{"image":"assets/images/geneExporer/headaneck.jpeg","name":'Head and Neck Cancer'}, {"image":"assets/images/geneExporer/KidneyCancer.png","name":'Kidney cancer'}, {"image":"assets/images/geneExporer/Melanoma.png","name":'Melanoma'},{"image":"assets/images/geneExporer/SCC.png","name":'SCC'},{"image":"assets/images/geneExporer/BCC.png","name":'BCC'}]
  public sampleTissueImg:any = [];
  public showSpinner:boolean = false;
  public showGenes:boolean = false;
  public showNotFound:boolean = true

  // public ExampleGenes:any = [{image:"assets/images/geneExporer/scc_visium_exmp.png",name:"SCC:Visium"}, 
  // {image:"assets/images/geneExporer/bcc_visium_exmp.png",name:"BCC:Visium"},{image:"assets/images/geneExporer/mel_vis_exmp.png",name:"Melanoma:Visium"}]
  constructor(private geneService: GeneexplorerService ) {}

  filteredCountries: any[];
  ngOnInit(): void {
     this.getGenes();
  }

  filterGeneAtlas(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    // if(query) {
      this.geneService.getGeneNameList({search:query}).subscribe((res:any) => {
        this.filteredGenesOrg =res.list;
        for (let i = 0; i < (this.filteredGenesOrg as any[]).length; i++) {
          let geneAtlas = (this.filteredGenesOrg as any[])[i];
          if (geneAtlas.id.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(geneAtlas);
          }
      }
      this.filteredGenes = filtered;
      })
    // }
    // else {
    //   this.geneService.getGeneNameList().subscribe((res:any) => {
    //     this.filteredGenesOrg =res.list
    //   })
    // }

  
}
getGenes() {
  this.geneService.getGeneNameList().subscribe((res:any) => {
    this.filteredGenesOrg =res.list
  })
}

onSelect(event) {
  var data:any = {};
  data.geneId = event.target.value;
  this.showSpinner = true;
  if(event?.target?.value && event.target.value !=" " && event.target.value !="") {
    this.geneService.getsamplesImg(data).subscribe((res:any) => {
      this.sampleTissueImg =  res.data
      this.showSpinner = false;
      this.showGenes = true;
      this.showNotFound = false
 },(err) => {
  this.showNotFound = true;
  this.showGenes = false;
  this.showSpinner = false;
 })
  } 

}

}
