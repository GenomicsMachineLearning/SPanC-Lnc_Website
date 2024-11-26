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
  NbSpinnerModule
} from '@nebular/theme';
import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {AboutComponent} from './about/about.component';
import {GeneExplorerComponent} from './gene-explorer/gene-explorer.component';
import {AtlasComponent} from './atlas/atlas.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ReactiveFormsModule} from '@angular/forms';
import {SinglecellComponent} from './singlecell/singlecell.component';
import {SpatialongreadComponent} from './spatialongread/spatialongread.component';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    MiscellaneousModule,
    NbCardModule,
    NbMenuModule,
    NbLayoutModule,
    NbListModule,
    NbCardModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbIconModule,
    NbSpinnerModule,
    NbButtonGroupModule,
    NbFormFieldModule,
    AutoCompleteModule,
    ConfirmDialogModule,
    TableModule,
    ToastModule
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
