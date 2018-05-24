import { NgModule } from "@angular/core";
import {MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule,
MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatSidenavModule,
MatToolbarModule, MatListModule, MatTabsModule, MatCardModule, MatSelectModule,
MatProgressSpinnerModule, MatDialogModule , MatTableModule,
MatSortModule, MatPaginatorModule, MatSnackBarModule} from '@angular/material';

const matModules : any[] = [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule
];

@NgModule({
    imports: matModules,
    exports: matModules
})
export class MaterialModule {}