import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {DomSanitizer} from "@angular/platform-browser";
import {environment} from "../../../environments/environment";
import {GlobalService} from "../../../service/global.service";

@Component({
  selector: 'ngx-spatialongread',
  templateUrl: './spatialongread.component.html',
  styleUrls: ['./spatialongread.component.scss']
})
export class SpatialongreadComponent {
  public sampleGenes: any = [
    {
      "image": "assets/images/geneExporer/headaneck.jpeg",
      "result": "",
      "name": 'Head and Neck Cancer - Nanopore'
    }, {
      "image": "assets/images/geneExporer/SCC.png",
      "result": "",
      "name": 'SCC - Nanopore'
    }, {
      "image": "assets/images/geneExporer/BCC.png",
      "result": "",
      "name": 'BCC - Nanopore'
    }, {
      "image": "assets/images/geneExporer/CP.png",
      "result": "",
      "name": 'Colorectal Cancer (Primary Tumor) - PacBio'
    }, {
      "image": "assets/images/geneExporer/CM.png",
      "result": "",
      "name": 'Colorectal Cancer (Metastasized Tumor) - PacBio'
    }
  ];
  public showSpinner: boolean = false;
  public showGenes: boolean = false;
  public showNotFound: boolean = true
  searchControl = new FormControl();

  constructor(private sanitizer: DomSanitizer, private glService: GlobalService) {
    this.searchControl.valueChanges
      .pipe(debounceTime(1000)) // Adjust debounce time as per your requirement
      .subscribe(newValue => {
        if (newValue) {
          const cutarId = newValue?.trim();
          this.updateImageUrls(cutarId)
        }
        this.showGenes = true;
      });
  }

  constructImageUrl(cutarId: string, sampleName: string): string {
    return `${environment.apiBaseURL}${this.glService.getGeneImgSlr}?cutarId=${cutarId}&sampleName=${encodeURIComponent(sampleName)}`;
  }

  updateImageUrls(cutarId: string): void {
    this.sampleGenes = this.sampleGenes.map(gene => ({
      ...gene,
      result: this.sanitizer.bypassSecurityTrustUrl((this.constructImageUrl(cutarId, gene.name)))
    }));
  }
}
