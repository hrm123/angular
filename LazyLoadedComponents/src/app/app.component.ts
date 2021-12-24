import {Component, ComponentFactoryResolver, Injector, OnDestroy, SimpleChange, ViewChild, ViewContainerRef} from '@angular/core';
import {QuizService} from './quiz.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  @ViewChild('quizContainer', {read: ViewContainerRef}) quizContainer: ViewContainerRef | undefined;
  quizStarted = false;
  private destroy$ = new Subject();

  constructor(private quizservice: QuizService, private cfr: ComponentFactoryResolver, private injector: Injector) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  async showNewQuestion() {
    this.lazyLoadQuizCard();
  }

  async startQuiz() {
    await this.lazyLoadQuizCard();
    this.quizStarted = true;
  }

  private async lazyLoadQuizCard() {
    const {QuizCardComponent} = await import('./quiz-card/quiz-card.component');
    const quizCardFactory = this.cfr.resolveComponentFactory(QuizCardComponent);
    if(! this.quizContainer) {
      return;
    }
    const {instance} = this.quizContainer.createComponent(QuizCardComponent);
    instance.question = this.quizservice.getNextQuestion();
    instance.questionAnswered.pipe(
      takeUntil(instance.destroy$)
    ).subscribe(() => this.showNewQuestion());
    (instance as any).ngOnChanges({
      question: new SimpleChange(null, instance.question, true)
    });
  }
}
