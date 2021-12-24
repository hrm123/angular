import {Component, EventEmitter, Input, NgModule, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {Question} from '../quiz.service';
import {CommonModule} from '@angular/common';
import {Subject} from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent implements OnChanges, OnDestroy {

  @Input() question: Question = {
    image: '',
    possibleSelections: [],
    correctAnswer: 'Lisbon'
  };
  @Output() questionAnswered = new EventEmitter<boolean>();
  destroy$ = new Subject();
  answeredCorrectly: boolean | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('this.question', changes['question'].currentValue)
    console.log('answeredCorrectly !== undefined', this.answeredCorrectly !== undefined);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  answer(selectedAnswer: string) {
    if(this.question){
      debugger;
      this.answeredCorrectly = selectedAnswer === this.question.correctAnswer;
      this.questionAnswered.next(this.answeredCorrectly);
    }
  }

}

@NgModule({
  declarations: [QuizCardComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule]
})
class QuizCardModule {
}
