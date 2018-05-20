import { NgModule } from "@angular/core";
import {MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule } from '@angular/material';

const matModules : any[] = [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule

];

@NgModule({
    imports: matModules,
    exports: matModules
})
export class MaterialModule {}