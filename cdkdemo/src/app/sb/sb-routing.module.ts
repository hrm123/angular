import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SbComponent } from './sb.component';

const routes: Routes = [{ path: '', component: SbComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SbRoutingModule { }
