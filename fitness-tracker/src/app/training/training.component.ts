import { Component, OnInit } from '@angular/core';
import {PastTrainingComponent} from './past-training/past-training.component';
import {NewTrainingComponent} from './new-training/new-training.component';
import { Subscription } from 'rxjs/subscription';
import { TrainingService } from './training.service';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining : boolean = false;
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(exer => {
      if(exer) {
        this.ongoingTraining = true;  
      } else {
        this.ongoingTraining = false;
      }
    });
  }

}
