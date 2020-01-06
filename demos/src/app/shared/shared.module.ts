import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinner } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';
import { ModalDirective } from './modal/modal.directive';
import { ModalService } from './modal/modal.service';

@NgModule({
  declarations: [
   
    LoadingSpinner,
    ModalDirective,
    DropdownDirective
  ],
  imports: [CommonModule],
  exports: [
    
    LoadingSpinner,
    ModalDirective,
    DropdownDirective,
    CommonModule
  ],
  providers:[
    ModalService
  ]
  // entryComponents: [AlertComponent]
})
export class SharedModule {}
