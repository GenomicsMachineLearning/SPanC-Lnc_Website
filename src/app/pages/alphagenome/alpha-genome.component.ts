import {ConfirmationService, MessageService} from 'primeng/api';
import {Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-gene-explorer',
  templateUrl: './alpha-genome.component.html',
  styleUrls: ['./alpha-genome.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AlphaGenomeComponent {
  search: string = '';
  isLoading: boolean = false;
  searchResults: any = null;
  imageUrl: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  onSearch() {
    if (!this.search.trim()) {
      this.errorMessage = 'Please enter a search term';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.imageUrl = '';

    // Replace with your actual API endpoint
    const apiUrl = 'YOUR_API_ENDPOINT';

    // Prepare search payload
    const searchPayload = {
      query: this.search.trim(),
      // Add any other required parameters
    };

    this.http.post(apiUrl, searchPayload).subscribe({
      next: (response: any) => {
        this.searchResults = response;

        // Extract image URL from response
        // Adjust this based on your API response structure
        if (response.imageUrl) {
          this.imageUrl = response.imageUrl;
        } else if (response.data && response.data.image) {
          this.imageUrl = response.data.image;
        } else if (response.image) {
          this.imageUrl = response.image;
        }

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.errorMessage = 'Search failed. Please try again.';
        this.isLoading = false;
      }
    });
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  clearSearch() {
    this.search = '';
    this.imageUrl = '';
    this.searchResults = null;
    this.errorMessage = '';
  }
}
