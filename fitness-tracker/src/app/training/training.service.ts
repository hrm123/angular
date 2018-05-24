import {Injectable} from '@angular/core';
import {Exercise} from './exercise.model';
import { EventEmitter } from 'events';
import {Subject} from 'rxjs/Subject';
import {AngularFirestore} from 'angularfire2/firestore';
import { Subscription } from 'rxjs';

@Injectable()
export class TrainingService {

    
    private availableExercises : Exercise[] = [];
    private fbSubs : Subscription[] = [];
    /*
    [
        {id: 'crunches', name: 'Crunches', duration: 3000, calories: 8},
        {id: 'touch-toes', name: 'Touch Toes', duration: 18000, calories: 18},
        {id: 'side-lunges', name: 'Side Lunges', duration: 12000, calories: 28},
        {id: 'burpees', name: 'Burpees', duration: 6000, calories: 8}
    ];
    */

    private runningExercise : Exercise; 
    private finishedExercises : Exercise[] = []; 
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();

    constructor(private db: AngularFirestore) {}

    fetchExercises() {
        this.fbSubs.push(this.db.collection("availableExercises")
            .snapshotChanges()
            .map(docArray => {
                return docArray.map( doc => {
                return {
                    id: doc.payload.doc["id"] ,
                    name: doc.payload.doc.data()["name"],
                    duration: doc.payload.doc.data()["duration"],
                    calories: doc.payload.doc.data()["calories"]
                    };
                });
            })
            .subscribe((exercises: Exercise[]) => {
                console.log(exercises);
                this.availableExercises = exercises;
                this.exercisesChanged.next([...this.availableExercises]);
            }));
      //return this.availableExercises.slice();
    }

    getPrevExercises() {
        return this.finishedExercises.slice();
    }

    fetchPreviousExercises() {
        this.fbSubs.push(this.db.collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise []) =>{
            this.finishedExercises = exercises;
            this.finishedExercisesChanged.next(exercises);
        }));
    }

    startExercise(id: string) {
        // this.db.doc(`availableExercises/${id}`).update({lastSelected: new Date()})
        this.runningExercise = this.availableExercises.find(ex => ex.id === id);
        this.exerciseChanged.next({... this.runningExercise});
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    completeExercise() {
        this.addDataToDatabase({...this.runningExercise, date: new Date(), state: 'completed' });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.runningExercise,
             date: new Date(), 
             state: 'cancelled',
            duration: this.runningExercise.duration * ( progress /100 ),
            calories: this.runningExercise.calories * ( progress /100 )
          });        
        this.runningExercise = null;
        this.exerciseChanged.next(null);    
    }


    getRunningExercise() {
        return {...this.runningExercise};
    }

    private addDataToDatabase(exercise : Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }

    
}