import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { GeneexplorerService } from '../../service/geneexplorer.service';


@Component({
  selector: 'ngx-spatialongread',
  templateUrl: './spatialongread.component.html',
  styleUrls: ['./spatialongread.component.scss']
})
export class SpatialongreadComponent {

  public geneAtlas:any = [{name:'IGKC'},{name:'FLG'},{name:'LOR'},{name:'LCE1C'},{name:'P13'},{name:'KRT1'},{name:'LTF'},{name:'MMP'}]
  public filteredGenes:any = [];
  // public filteredGenesOrg:any = [];
  public filteredGenesOrg:any = [{CUTAR_ID:"cuTAR100897"},{CUTAR_ID:"cuTAR213507"},{CUTAR_ID: "cuTAR234975"}]

  // public sampleGenes:any = [{image:"assets/images/geneExporer/hnopc.jpeg",name:"Head and Neck OPSCC"}];
  public sampleGenes:any = [{"image":"assets/images/geneExporer/headaneck.jpeg","name":'Head and Neck Cancer - Nanopore'},{"image":"assets/images/geneExporer/SCC.png","name":'SCC - Nanopore'},{"image":"assets/images/geneExporer/BCC.png","name":'BCC - Nanopore'},{"image":"assets/images/geneExporer/CP.png","name":'Colorectal Cancer (Primary Tumor) - PacBio'}, {"image":"assets/images/geneExporer/CM.png","name":'Colorectal Cancer (Metastasized Tumor) - PacBio'}]
  // public sampleGenes:any = [{"image":"assets/images/geneExporer/headaneck.jpeg","name":'Head and Neck Cancer'}, {"image":"assets/images/geneExporer/KidneyCancer.png","name":'Kidney cancer'}, {"image":"assets/images/geneExporer/Melanoma.png","name":'Melanoma'},{"image":"assets/images/geneExporer/SCC.png","name":'SCC'},{"image":"assets/images/geneExporer/BCC.png","name":'BCC'}]
  public sampleTissueImg:any = [];
  public showSpinner:boolean = false;
  public showGenes:boolean = false;
  public showNotFound:boolean = true
  searchControl = new FormControl();
  // public ExampleGenes:any = [{image:"assets/images/geneExporer/scc_visium_exmp.png",name:"SCC:Visium"},
  // {image:"assets/images/geneExporer/bcc_visium_exmp.png",name:"BCC:Visium"},{image:"assets/images/geneExporer/mel_vis_exmp.png",name:"Melanoma:Visium"}]
  constructor(private geneService: GeneexplorerService ) {
    this.searchControl.valueChanges
      .pipe(debounceTime(1000)) // Adjust debounce time as per your requirement
      .subscribe(newValue => {
        // This code will execute after 300ms of user input pause
        if(newValue) {
          var data:any = {};
        data.cutarId = newValue?.trim();
          this.showSpinner = true;
          this.geneService.getsamplesImgSlr(data).subscribe((res:any) => {
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
      });
  }

  filteredCountries: any[];

  filterGeneAtlas(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    // if(query) {
      this.geneService.getGeneNameList({search:query}).subscribe((res:any) => {
        this.filteredGenesOrg =res.list;
        for (let i = 0; i < (this.filteredGenesOrg as any[]).length; i++) {
          let geneAtlas = (this.filteredGenesOrg as any[])[i];
          if (geneAtlas?.CUTAR_ID?.toLowerCase().indexOf(query?.toLowerCase()) == 0) {
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
  data.cutarId = event.target.value;
  this.showSpinner = true;
  if(event?.target?.value && event.target.value !=" " && event.target.value !="") {
    this.geneService.getsamplesImgSlr(data).subscribe((res:any) => {
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
