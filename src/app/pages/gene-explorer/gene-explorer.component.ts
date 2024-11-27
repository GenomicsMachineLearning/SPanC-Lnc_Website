import {ConfirmationService, MessageService} from 'primeng/api';
import {Component} from '@angular/core';
import {GeneexplorerService} from '../../../service/geneexplorer.service';
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'ngx-gene-explorer',
  templateUrl: './gene-explorer.component.html',
  styleUrls: ['./gene-explorer.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class GeneExplorerComponent {
  public search: string
  public rowsPerPageOptions: any = [5, 10, 15];
  public totalRecords: number;
  public loading: boolean
  itemPrePage: number = 10;
  genes!: any[];
  statuses!: any[];

  constructor(
    private geneService: GeneexplorerService) {
  }

  private joinSearchParams(params: string[]): string {
    return params
      .filter(param => param != null && param.trim() !== '')
      .join(',');
  }

  loadListing(data: any) {
    this.loading = true;
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
        console.log(searchTerms);
      }
    }

    this.geneService.getGeneExplorerList(queryParams).subscribe({
      next: (res: any) => {
        this.genes = res.list;
        this.totalRecords = res.totalCount;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.error('Error loading gene explorer data:', error);
      }
    });
  }
}
