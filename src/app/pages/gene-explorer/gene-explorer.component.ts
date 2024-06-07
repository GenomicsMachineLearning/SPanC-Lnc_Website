import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from '../../../service/geneExplorService';
import { Product } from '../../../interFaces/geneExplor';
import { Component,OnInit } from '@angular/core';
import Data from '../../../assets/data/Incrna_sampledata.json'
import { GeneexplorerService } from '../../../service/geneexplorer.service';
@Component({
  selector: 'ngx-gene-explorer',
  templateUrl: './gene-explorer.component.html',
  styleUrls: ['./gene-explorer.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class GeneExplorerComponent implements OnInit {
 public search:string
 public productDialog: boolean = false;
 public rowsPerPageOptions: any = [5,10,15];
 public totalRecords: number;
 public overAllRecord: any[]=Data;
 public loading:boolean
  itemPrePage:number=10;
    products!: any[];

    product!: Product;

    selectedProducts!: Product[] | null;

    submitted: boolean = false;

    statuses!: any[];

    constructor(
        private geneService: GeneexplorerService,
        private productService: ProductService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService) {}

    ngOnInit() {
    }


  loadPatientListing(data: any) {
    this.loading=true
    var body=data;
    var columnSearch:any[]=[]
    if(body){
        var object:any=body['filters']
            for (const item in object) {
                if(object[item].length){
                    object[item].forEach((searchItem:any) => {
                        if(searchItem.value){
                            columnSearch.push(searchItem.value)
                        }
                    });
                }
            }
        var pages=body['first']/body['rows'];
        var queryParams:any={
          page:pages+1,
          limit:body['rows']
        }
        if(data.sortField) {
            queryParams.ordering = data.sortField
        }
        else {
            queryParams.ordering = 'cutar_id'
        }
        if(data.sortOrder === -1) {
            queryParams.ordering =    '-' +  queryParams.ordering
        }
      if(body['globalFilter']){
          if(columnSearch.toString()){
            queryParams['search']=`${body['globalFilter']},${columnSearch.toString()}`
          }else{
            queryParams['search']=body['globalFilter']
          }
      }else{
          if(columnSearch.toString()){
            queryParams['search']=`${columnSearch.toString()}`
          }
      }
    }
    this.geneService.getGeneExplorerList(queryParams).subscribe((res:any)=>{
        this.products=res.list
        this.totalRecords=res.totalCount;
        this.loading=false
    })
}

}



