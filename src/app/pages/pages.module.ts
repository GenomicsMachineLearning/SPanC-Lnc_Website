import {NgModule} from '@angular/core';
import {
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
} from '@nebular/theme';
import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {AboutComponent} from './about/about.component';
import {GeneExplorerComponent} from './gene-explorer/gene-explorer.component';
import {AtlasComponent} from './atlas/atlas.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {OrderListModule} from 'primeng/orderlist';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ReactiveFormsModule} from '@angular/forms';
import {SpatialongreadComponent} from "./spatialongread/spatialongread.component";
import {SinglecellComponent} from "./singlecell/singlecell.component";


@NgModule({
  imports: [
    PagesRoutingModule,
    MiscellaneousModule,
    ThemeModule,
    NbButtonModule,
    NbButtonGroupModule,
    NbCardModule,
    NbFormFieldModule,
    NbIconModule,
    NbLayoutModule,
    NbListModule,
    NbMenuModule,
    AutoCompleteModule,
    ConfirmDialogModule,
    InputTextModule,
    InputNumberModule,
    OrderListModule,
    PaginatorModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule,
  ],
  declarations: [
    PagesComponent,
    AboutComponent,
    GeneExplorerComponent,
    AtlasComponent,
    SpatialongreadComponent,
    SinglecellComponent
  ],
  providers: []
})
export class PagesModule {

}
