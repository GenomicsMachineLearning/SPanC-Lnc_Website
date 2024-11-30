import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {GeneExplorerService} from '../../../service/gene-explorer.service';
import {DomSanitizer} from "@angular/platform-browser";
import {environment} from "../../../environments/environment";
import {GlobalService} from "../../../service/global.service";

@Component({
  selector: 'ngx-singlecell',
  templateUrl: './singlecell.component.html',
  styleUrls: ['./singlecell.component.scss']
})
export class SinglecellComponent {
  public sampleGenes: any = [
    {
      "image": "assets/images/geneExporer/Mel_scRNA_UMAP.png",
      "result": "",
      "name": 'Melanoma'
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
    return `${environment.apiBaseURL}${this.glService.getGeneImgScr}?cutarId=${cutarId}&sampleName=${encodeURIComponent(sampleName)}`;
  }

  updateImageUrls(cutarId: string): void {
    this.sampleGenes = this.sampleGenes.map(gene => ({
      ...gene,
      result: this.sanitizer.bypassSecurityTrustUrl((this.constructImageUrl(cutarId, gene.name)))
    }));
  }
}
