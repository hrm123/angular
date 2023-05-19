import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SbRoutingModule } from './sb-routing.module';
import { SbComponent } from './sb.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import {OverlayModule} from '@angular/cdk/overlay';
import { SNACKBAR_CONFIG_TOKEN, defaultSnackbarConfig } from './snackbar/snackbar-config';

@NgModule({
  declarations: [
    SbComponent,
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    SbRoutingModule,
    OverlayModule 
  ],
  exports: [
    SbComponent
  ]
})
export class SbModule { 
  public static forRoot(config = defaultSnackbarConfig): ModuleWithProviders<SbModule> {
    return {
        ngModule: SbModule,
        providers: [
            {
                provide: SNACKBAR_CONFIG_TOKEN,
                useValue: { ...defaultSnackbarConfig, ...config },
            },
        ],
    };
}

}
