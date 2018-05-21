import { NgModule } from "@angular/core";
import {MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule,
MatDatepickerModule, MatNativeDateModule, MatCheckboxModule } from '@angular/material';

const matModules : any[] = [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
];

@NgModule({
    imports: matModules,
    exports: matModules
})
export class MaterialModule {}