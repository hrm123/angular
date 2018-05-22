import {Exercise} from './exercise.model';
import { EventEmitter } from 'events';
import {Subject} from 'rxjs/Subject';

export class TrainingService {
    private availableExercises : Exercise[] = [
        {id: 'crunches', name: 'Crunches', duration: 3000, calories: 8},
        {id: 'touch-toes', name: 'Touch Toes', duration: 18000, calories: 18},
        {id: 'side-lunges', name: 'Side Lunges', duration: 12000, calories: 28},
        {id: 'burpees', name: 'Burpees', duration: 6000, calories: 8}
    ];

    private runningExercise : Exercise; 
    private prevExercises : Exercise[] = []; 
    exerciseChanged = new Subject<Exercise>();

    getExercises() {
        return this.availableExercises.slice();
    }

    getPrevExercises() {
        return this.prevExercises.slice();
    }

    startExercise(id: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === id);
        this.exerciseChanged.next({... this.runningExercise});
    }

    completeExercise() {
        this.prevExercises.push({...this.runningExercise, date: new Date(), state: 'completed' });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.prevExercises.push({
            ...this.runningExercise,
             date: new Date(), 
             state: 'cancelled',
            duration: this.runningExercise.duration * ( progress /100 ),
            calories: this.runningExercise.duration * ( progress /100 )
          });        
        this.runningExercise = null;
        this.exerciseChanged.next(null);    
    }


    getRunningExercise() {
        return {...this.runningExercise};
    }

    
}