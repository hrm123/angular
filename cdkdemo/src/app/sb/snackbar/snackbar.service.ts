import { Injectable, Inject , Injector } from '@angular/core';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { SbModule } from '../sb.module';
import { SnackbarComponent } from './snackbar.component';
import { ToastDetail } from './snackbar.component';
import { SNACKBAR_CONFIG_TOKEN, SnackbarConfig, SnackbarDetail } from './snackbar-config';
import { SnackbarRef } from './snackbar-ref';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private lastSnackbar!: SnackbarRef;
  private readonly CORNER_OFFSET = '20px';

  constructor(private overlay: Overlay,
    private parentInjector: Injector,
    @Inject(SNACKBAR_CONFIG_TOKEN) private snackbarConfig: SnackbarConfig) {
    
   }

   getPositionStrategy() {
    const rightPosition = this.snackbarConfig.position ? this.snackbarConfig.position.right + 'px' : '0px';
    return this.overlay.position()
      .global()
      .top(this.getPosition())
      .right(rightPosition);
  }
  getPosition() {
    const lastSnackbarIsVisible = this.lastSnackbar && this.lastSnackbar.isVisible();
    const position = lastSnackbarIsVisible 
      ? this.lastSnackbar.getPosition().bottom
      : this.snackbarConfig.position ? this.snackbarConfig.position.top : 0;

    return position + 'px';
  }

  getInjector(detail: SnackbarDetail, toastRef: SnackbarRef, parentInjector: Injector) {
    const tokens = new WeakMap();

    tokens.set(SnackbarDetail, detail);
    tokens.set(SnackbarRef, toastRef);

    return new PortalInjector(parentInjector, tokens);
  }

   openSnackbar(message: string, options?: any){
    const positionStrategy = this.getPositionStrategy();
    const overlayRef = this.overlay.create({ positionStrategy });
    if(overlayRef.hasAttached()){
      overlayRef.detach();
    }
    const toastRef = new SnackbarRef(overlayRef);
    this.lastSnackbar = toastRef;
    let detail: SnackbarDetail = {
      type : 'info',
      text : message
    };
    const injector = this.getInjector(detail, toastRef, this.parentInjector);
    const toastPortal = new ComponentPortal(SnackbarComponent, null, injector);

    overlayRef.attach(toastPortal);

    return toastRef;
   }
}
