import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable, Subscription} from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  trainings : Observable<any>;
  exercises : Exercise[];
  exerciseSubscription : Subscription;
  loadingSubscription : Subscription;
  isLoading = false;

  constructor(private trainingService: TrainingService, private uiService : UIService ) { }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading);
    this.exerciseSubscription =  this.trainingService.exercisesChanged.subscribe(
      (exercises) => { 
        this.exercises = exercises; 
        console.log('this.exercises', this.exercises);
      }
    );
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchExercises();
  }

  onStartTraining(f: NgForm) {
    this.trainingService.startExercise(f.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }

}
