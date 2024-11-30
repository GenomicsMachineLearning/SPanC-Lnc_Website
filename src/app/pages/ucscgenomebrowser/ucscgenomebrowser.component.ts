import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Component} from "@angular/core";

@Component({
  selector: 'ngx-ucscgenomebrowser',
  templateUrl: './ucscgenomebrowser.component.html',
  styleUrls: ['./ucscgenomebrowser.component.scss']
})
export class UcscgenomebrowserComponent {
  trustedUrl: SafeResourceUrl;

  constructor(sanitizer: DomSanitizer) {
    const url = 'https://genome.ucsc.edu/s/Prakrithi/cuTARs_UCSC';
    this.trustedUrl = sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
