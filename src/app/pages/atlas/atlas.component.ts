import {Component} from '@angular/core';
import {GeneexplorerService} from '../../../service/geneexplorer.service';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'ngx-atlas',
  templateUrl: './atlas.component.html',
  styleUrls: ['./atlas.component.scss']
})
export class AtlasComponent {
  public filteredGenes: any = [];
  public filteredGenesOrg: any = [{CUTAR_ID: "cuTAR100897"}, {CUTAR_ID: "cuTAR213507"}, {CUTAR_ID: "cuTAR234975"}]
  public sampleGenes: any = [
    {
      "image": "assets/images/geneExporer/headaneck.jpeg",
      "name": 'Head and Neck Cancer'
    },
    {
      "image": "assets/images/geneExporer/Melanoma.png",
      "name": 'Melanoma'
    },
    {
      "image": "assets/images/geneExporer/SCC.png",
      "name": 'SCC'
    },
    {
      "image": "assets/images/geneExporer/BCC.png",
      "name": 'BCC'
    },
    {
      "image": "assets/images/geneExporer/KidneyCancer.png",
      "name": 'Kidney Cancer'
    }
  ];
  public sampleTissueImg: any = [];
  public showSpinner: boolean = false;
  public showGenes: boolean = false;
  public showNotFound: boolean = true
  searchControl = new FormControl();

  constructor(private geneService: GeneexplorerService) {
    this.searchControl.valueChanges
      .pipe(debounceTime(1000)) // Adjust debounce time as per your requirement
      .subscribe(newValue => {
        // This code will execute after 300ms of user input pause
        if (newValue) {
          var data: any = {};
          data.cutarId = newValue?.trim();
          this.showSpinner = true;
          this.geneService.getsamplesImg(data).subscribe((res: any) => {
            this.sampleTissueImg = res.data
            this.showSpinner = false;
            this.showGenes = true;
            this.showNotFound = false
          }, (err) => {
            this.showNotFound = true;
            this.showGenes = false;
            this.showSpinner = false;
          })
        }
      });
  }

  filterGeneAtlas(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    // if(query) {
    this.geneService.getGeneNameList({search: query}).subscribe((res: any) => {
      this.filteredGenesOrg = res.list;
      for (let i = 0; i < (this.filteredGenesOrg as any[]).length; i++) {
        let geneAtlas = (this.filteredGenesOrg as any[])[i];
        if (geneAtlas?.CUTAR_ID?.toLowerCase().indexOf(query?.toLowerCase()) == 0) {
          filtered.push(geneAtlas);
        }
      }
      this.filteredGenes = filtered;
    })
  }

  getGenes() {
    this.geneService.getGeneNameList().subscribe((res: any) => {
      this.filteredGenesOrg = res.list
    })
  }

  onSelect(event) {
    var data: any = {};
    data.cutarId = event.target.value;
    this.showSpinner = true;
    if (event?.target?.value && event.target.value != " " && event.target.value != "") {
      this.geneService.getsamplesImg(data).subscribe((res: any) => {
        this.sampleTissueImg = res.data
        this.showSpinner = false;
        this.showGenes = true;
        this.showNotFound = false
      }, (err) => {
        this.showNotFound = true;
        this.showGenes = false;
        this.showSpinner = false;
      })
    }
  }
}
