import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { GeneExplorerComponent } from './gene-explorer/gene-explorer.component';
import { AtlasComponent } from './atlas/atlas.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'about',
      component: AboutComponent,
    },

    {
      path: 'browse',
      component: GeneExplorerComponent,
    },
    {
      path: 'geneexplorer',
      component: AtlasComponent,
    },
    {
      path: '',
      redirectTo: 'about',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
