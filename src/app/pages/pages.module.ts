import {NgModule} from '@angular/core';
import {
  NbAlertModule,
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbSpinnerModule
} from '@nebular/theme';
import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {AboutComponent} from './about/about.component';
import {GeneExplorerComponent} from './gene-explorer/gene-explorer.component';
import {AtlasComponent} from './atlas/atlas.component';
import {AlphaGenomeComponent} from './alphagenome/alpha-genome.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SpatialongreadComponent} from "./spatialongread/spatialongread.component";
import {SinglecellComponent} from "./singlecell/singlecell.component";
import {UcscgenomebrowserComponent} from "./ucscgenomebrowser/ucscgenomebrowser.component";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  imports: [
    PagesRoutingModule,
    MiscellaneousModule,
    AutoCompleteModule,
    ConfirmDialogModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TableModule,
    ThemeModule,
    ToastModule,
    NbAlertModule,
    NbButtonModule,
    NbButtonGroupModule,
    NbCardModule,
    NbFormFieldModule,
    NbIconModule,
    NbInputModule,
    NbLayoutModule,
    NbListModule,
    NbMenuModule,
    NbSpinnerModule,
  ],
  declarations: [
    PagesComponent,
    AboutComponent,
    GeneExplorerComponent,
    AtlasComponent,
    AlphaGenomeComponent,
    SpatialongreadComponent,
    SinglecellComponent,
    UcscgenomebrowserComponent,
  ],
  providers: []
})
export class PagesModule {

}
