import {ConfirmationService, MessageService} from 'primeng/api';
import {Component} from '@angular/core';
import {GeneExplorerService} from '../../../service/gene-explorer.service';

@Component({
  selector: 'ngx-gene-explorer',
  templateUrl: './gene-explorer.component.html',
  styleUrls: ['./gene-explorer.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class GeneExplorerComponent {
  public search: string = '';
  public rowsPerPageOptions: any = [5, 10, 15];
  public totalRecords: number = 0;
  public loading: boolean = false;
  itemPrePage: number = 10;
  genes: any[] = [];
  statuses: any[] = [];

  public isLoading: boolean = false;
  public errorMessage: string = '';
  private tableRef: any;

  constructor(
    private geneService: GeneExplorerService,
    private messageService: MessageService) {
  }

  onSearch() {
    if (!this.search?.trim()) {
      this.errorMessage = 'Please enter a search term';
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please enter a search term'
      });
      return;
    }

    this.errorMessage = '';

    // If table reference exists, trigger global filter
    if (this.tableRef) {
      this.tableRef.filterGlobal(this.search.trim(), 'contains');
    } else {
      // Fallback: reload data with search term
      this.loadListingWithSearch();
    }
  }

  clearSearch(dt?: any) {
    this.search = '';
    this.errorMessage = '';

    // Store table reference for future use
    if (dt) {
      this.tableRef = dt;
      dt.filterGlobal('', 'contains'); // Clear the table filter
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  private joinSearchParams(params: string[]): string {
    return params
      .filter(param => param != null && param.trim() !== '')
      .join(',');
  }

  private loadListingWithSearch() {
    this.isLoading = true;

    const queryParams: any = {
      page: 1,
      limit: this.itemPrePage,
      search: this.search.trim(),
      ordering: 'cutar_id'
    };

    this.geneService.getGeneExplorerList(queryParams).subscribe({
      next: (res: any) => {
        this.genes = res.list;
        this.totalRecords = res.totalCount;
        this.isLoading = false;
        this.loading = false;

        if (res.list.length === 0) {
          this.messageService.add({
            severity: 'info',
            summary: 'No Results',
            detail: 'No genes found matching your search criteria'
          });
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.loading = false;
        this.errorMessage = 'Search failed. Please try again.';
        console.error('Error searching genes:', error);

        this.messageService.add({
          severity: 'error',
          summary: 'Search Error',
          detail: 'Failed to search genes. Please try again.'
        });
      }
    });
  }

  loadListing(data: any) {
    setTimeout(() => {
      this.loading = true;
    });
    this.errorMessage = '';

    const queryParams: any = {};
    if (data) {
      queryParams.page = Math.floor(data.first / data.rows) + 1;
      queryParams.limit = data.rows;
      if (data.sortField) {
        queryParams.ordering = data.sortOrder === -1 ? `-${data.sortField}` : data.sortField;
      } else {
        queryParams.ordering = 'cutar_id';
      }
      const columnSearches: string[] = [];
      if (data.filters) {
        Object.values(data.filters).forEach((filterGroup: any[]) => {
          if (Array.isArray(filterGroup) && filterGroup.length) {
            filterGroup.forEach(filter => {
              if (filter?.value) {
                columnSearches.push(filter.value);
              }
            });
          }
        });
      }
      if (data.globalFilter || columnSearches.length) {
        const searchTerms: string[] = [];
        if (data.globalFilter) {
          searchTerms.push(data.globalFilter);
        }
        searchTerms.push(...columnSearches);
        queryParams.search = this.joinSearchParams(searchTerms);
      }
    }

    this.geneService.getGeneExplorerList(queryParams).subscribe({
      next: (res: any) => {
        this.genes = res.list;
        this.totalRecords = res.totalCount;
        this.loading = false;

        if (data?.globalFilter) {
          this.search = data.globalFilter;
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Failed to load gene data. Please try again.';
        console.error('Error loading gene explorer data:', error);

        this.messageService.add({
          severity: 'error',
          summary: 'Loading Error',
          detail: 'Failed to load gene data. Please try again.'
        });
      }
    });
  }
}
