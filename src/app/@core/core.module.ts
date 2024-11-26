import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  LayoutService,
  StateService,
} from './utils';
import { StatsBarData } from './data/stats-bar';
import { StatsProgressBarData } from './data/stats-progress-bar';

import { StatsBarService } from './mock/stats-bar.service';
import { StatsProgressBarService } from './mock/stats-progress-bar.service';

const DATA_SERVICES = [
  { provide: StatsBarData, useClass: StatsBarService },
  { provide: StatsProgressBarData, useClass: StatsProgressBarService },
];

export const NB_CORE_PROVIDERS = [
  ...DATA_SERVICES,
  LayoutService,
  StateService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
