import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {GeneExplorerService} from "../../../service/gene-explorer.service";
import {environment} from "../../../environments/environment";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngx-atlas',
  templateUrl: './atlas.component.html',
  styleUrls: ['./atlas.component.scss']
})
export class AtlasComponent {
  public sampleGenes: any = [
    {
      "image": "assets/images/geneExporer/headaneck.jpeg",
      "result": "",
      "name": 'Head and Neck Cancer'
    },
    {
      "image": "assets/images/geneExporer/Melanoma.png",
      "result": "",
      "name": 'Melanoma'
    },
    {
      "image": "assets/images/geneExporer/SCC.png",
      "result": "",
      "name": 'SCC'
    },
    {
      "image": "assets/images/geneExporer/BCC.png",
      "result": "",
      "name": 'BCC'
    },
    {
      "image": "assets/images/geneExporer/KidneyCancer.png",
      "result": "",
      "name": 'Kidney Cancer'
    }
  ];
  public sampleTissueImg: any = [];
  public showSpinner: boolean = false;
  public showGenes: boolean = false;
  public showNotFound: boolean = true
  searchControl = new FormControl();

  constructor(private sanitizer: DomSanitizer) {
    this.searchControl.valueChanges
      .pipe(debounceTime(1000)) // Adjust debounce time as per your requirement
      .subscribe(newValue => {
        // This code will execute after 300ms of user input pause
        if (newValue) {
          const cutarId = newValue?.trim();
          this.updateImageUrls(cutarId)
        }
        this.showGenes = true;
      }
    );
  }

  constructImageUrl(cutarId: string, sampleName: string): string {
    return `${environment.apiBaseURL}/genes?cutarId=${cutarId}&sampleName=${encodeURIComponent(sampleName)}`;
  }

  updateImageUrls(cutarId: string): void {
    this.sampleGenes = this.sampleGenes.map(gene => ({
      ...gene,
      result: this.sanitizer.bypassSecurityTrustUrl((this.constructImageUrl(cutarId, gene.name)))
    }));
  }
}
