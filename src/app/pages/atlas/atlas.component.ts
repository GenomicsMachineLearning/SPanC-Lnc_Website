import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {GeneExplorerService} from "../../../service/gene-explorer.service";

@Component({
  selector: 'ngx-atlas',
  templateUrl: './atlas.component.html',
  styleUrls: ['./atlas.component.scss']
})
export class AtlasComponent {
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

  constructor(private geneService: GeneExplorerService) {
    this.searchControl.valueChanges
      .pipe(debounceTime(1000)) // Adjust debounce time as per your requirement
      .subscribe(newValue => {
        // This code will execute after 300ms of user input pause
        if (newValue) {
          var data: any = {};
          data.cutarId = newValue?.trim();
          this.showSpinner = true;
          this.geneService.getSamplesImg(data).subscribe((res: any) => {
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
}
