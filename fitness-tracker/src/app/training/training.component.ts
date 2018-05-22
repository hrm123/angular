import { Component, OnInit } from '@angular/core';
import {PastTrainingComponent} from './past-training/past-training.component';
import {NewTrainingComponent} from './new-training/new-training.component';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining : boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
