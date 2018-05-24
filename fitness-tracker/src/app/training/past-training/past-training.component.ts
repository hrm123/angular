import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatRow, MatHeaderRow, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ["date", "name",
   "calories", "duration",  "state"];
  dataSource = new MatTableDataSource<Exercise>();
  private exerciseChangedSubscription : Subscription;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe((exercises : Exercise[]) => {
      this.dataSource.data = exercises;
    });
    this.trainingService.fetchPreviousExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.exerciseChangedSubscription.unsubscribe();
  }


}
