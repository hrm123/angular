import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output()  trainingStart = new EventEmitter<void>();
  foods : any[] = [];

  constructor() { }

  ngOnInit() {
    this.foods.push('curry');
    this.foods.push('rice');
  }

  onStartTraining() {
    this.trainingStart.emit();
  }

}
