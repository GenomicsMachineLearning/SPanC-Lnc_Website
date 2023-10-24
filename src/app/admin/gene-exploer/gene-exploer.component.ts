import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from '../../../service/geneExplorService';
import { Product } from '../../../interFaces/geneExplor';
import { Component, OnInit } from '@angular/core';
import Data from '../../../assets/data/Incrna_sampledata.json'
import { GeneexplorerService } from '../../../service/geneexplorer.service';
@Component({
    selector: 'ngx-gene-exploer',
    templateUrl: './gene-exploer.component.html',
    styleUrls: ['./gene-exploer.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class GeneExploerComponent implements OnInit {
    public rowsPerPageOptions: any = [5,10, 15];
    public totalRecords: number;
    public overAllRecord: any[] = Data

    itemPrePage: number = 10;
    productDialog: boolean = false;

    products!: any[];

    product!: Product;

    selectedProducts!: Product[] | null;

    submitted: boolean = false;

    statuses!: any[];
    loading:boolean;
    constructor(
        private geneService: GeneexplorerService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService) { 

        }

    ngOnInit() {
        // this.productService.getProducts().then((data) => (this.products = Data));
        // this.products = Data;
        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }
    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
                this.selectedProducts = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter((val) => val.id !== product.id);
                this.product = {};
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.image = 'product-placeholder.svg';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }
    // ExportExcel(){
    //     let element = document.getElementById('primengTable');
    //     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    //     /* generate workbook and add the worksheet */
    //     const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    //     /* save to file */  
    //     XLSX.writeFile(wb, "sample");
    // }


    ExportExcel() {

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
              limit:body['rows'],
            }
            if(data.sortField) {
                queryParams.ordering = data.sortField
            }
            else {
                queryParams.ordering = 'geneid'
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
    onpageChange(pageinfo:any){
    }
    refres(){
    }
}


