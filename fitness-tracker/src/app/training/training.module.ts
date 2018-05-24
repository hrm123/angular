import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { StopTrainingComponent } from "./current-training/stop-training.component";
import { TrainingComponent } from "./training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingComponent } from "./past-training/past-training.component";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [    
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        StopTrainingComponent
    ],
    imports: [
        AngularFirestoreModule,
        SharedModule
    ],
    exports: [],
    entryComponents: [StopTrainingComponent]
}) 
export class TrainingModule {

}