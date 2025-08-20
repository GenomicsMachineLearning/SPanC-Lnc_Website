import {ConfirmationService, MessageService} from 'primeng/api';
import {Component} from '@angular/core';
import {AlphaGenomeService} from "../../../service/alpha-genome.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";


@Component({
  selector: 'ngx-alpha-genome',
  templateUrl: './alpha-genome.component.html',
  styleUrls: ['./alpha-genome.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AlphaGenomeComponent {
  search: string = '';
  currentSearchTerm: string = '';
  isLoading: boolean = false;
  searchResults: any = null;
  imageUrl: SafeUrl = '';
  errorMessage: string = '';

  constructor(private sanitizer: DomSanitizer, private alphaGenomeService: AlphaGenomeService) {
  }

  onSearch() {
    if (!this.search.trim()) {
      this.errorMessage = 'Please enter a search term';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.cleanupImageUrl();

    const searchParams = {
      search: this.search.trim(),
    };

    this.alphaGenomeService.getAlphaGenome(searchParams).subscribe({
      next: (blob: Blob) => {
        this.handleImageBlob(blob);
        this.currentSearchTerm = this.search.trim();
      },
      error: (error) => {
        this.handleSearchError(error);
      }
    });
  }

  private handleImageBlob(blob: Blob) {
    // Create blob URL and sanitize it
    const blobUrl = URL.createObjectURL(blob);
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(blobUrl); // Sanitize the URL
    this.isLoading = false;
  }

  private handleSearchError(error: any) {
    this.isLoading = false;

    if (error.error && error.error.error) {
      this.errorMessage = `Search failed: ${error.error.error}`;
      return;
    }
    if (error.status === 404) {
      this.errorMessage = 'Gene not found in the AlphaGenome database.';
    } else if (error.status === 500) {
      this.errorMessage = 'Server error. Please try again later.';
    } else if (error.status === 0) {
      this.errorMessage = 'Network error. Please check your connection.';
    } else {
      this.errorMessage = `Search failed: ${error.message || 'Please try again.'}`;
    }
  }

  private cleanupImageUrl() {
    if (this.imageUrl) {
      // Extract the original blob URL for cleanup
      const urlString = this.imageUrl.toString();
      if (urlString.startsWith('blob:')) {
        URL.revokeObjectURL(urlString);
      }
      this.imageUrl = '';
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  clearSearch() {
    this.search = '';
    this.currentSearchTerm = '';
    this.cleanupImageUrl(); // Clean up the blob URL
    this.searchResults = null;
    this.errorMessage = '';
  }

  ngOnDestroy() {
    this.cleanupImageUrl();
  }
}
