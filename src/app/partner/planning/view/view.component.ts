import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Coach, Workout, WorkoutInstance, Day } from '../../../models/index';

import { WorkoutModalComponent } from '../workout-information/workout-modal.component';
import { AddSessionModalComponent } from '../modal/add-session-modal.component';

import { WorkoutDateProvider } from '../../workoutdate.provider';
import { CoachService,
  WorkoutService,
  WorkoutInstanceService,
  SpaceService } from '../../../_services/index';

@Component({
  selector: 'planning-view',
  styleUrls: ['./view.component.scss'],
  templateUrl: 'view.component.html'
})

export class ViewComponent implements OnInit {
  public selectedCoach: Coach;
  public coaches: Coach[];
  public tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  public firstDisplayedDay: Date;
  public lastDisplayedDay: Date;
  public displayedDays: Day[];
  public displayStyle: string = 'week';
  public hours: any = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  public quarters: any = [0, 15, 30, 45];
  public displayedWorkouts: WorkoutInstance[];
  constructor(
    private spaceService: SpaceService,
    private route: ActivatedRoute,
    private router: Router,
    private coachService: CoachService,
    private workoutService: WorkoutService,
    private workoutInstanceService: WorkoutInstanceService,
    private WorkoutDateProvider: WorkoutDateProvider,
    public dialog: MdDialog
  ) {
    this.firstDisplayedDay = new Date();
    this.lastDisplayedDay = new Date();
    this.setDateBoundaries();
  }

  public ngOnInit(): void {
    this.coachService.getMyCoaches()
      .then((coaches) => {
        this.coaches = coaches;
        this.route.params.subscribe((params: Params) => {
          this.selectedCoach = this.coaches.find(
            (coach: Coach) => coach.id === parseInt(params['id'], 10));
          if (!(this.selectedCoach instanceof Object)) {
            this.selectedCoach = this.coaches[0];
          }
          this.refreshDisplayedDays();
        });
      })
      .catch(this.handleError);

  }

  public onCoachChange() {
    this.refreshDisplayedDays();
  }

  public showModalWorkoutInformationComponent(id: number) {
    let dialogRef = this.dialog.open(WorkoutModalComponent, {
      data: id,
    });
  }

  public displayWorkout() {
    let quarterHeight = 1.05;
    let hoursHeight = quarterHeight * 4 + 1 / 16;
    this.displayedWorkouts.forEach((workout) => {
      let workoutstartDate = new Date(workout.startdate);
      this.displayedDays.forEach((day) => {
        if (workoutstartDate.getDate() === day.date.getDate()
          && workoutstartDate.getDate() === day.date.getDate()) {
          let workoutEndDate = new Date(workout.enddate);
          let hours = Math.ceil(workout.workout.duration / 60);
          let minutes = workout.workout.duration % 60;
          let top = 2 + (workoutstartDate.getHours() - 6) * hoursHeight + Math.ceil(workoutstartDate.getMinutes() / 15) * quarterHeight;
          let height = (hours) * hoursHeight + Math.ceil(minutes / 15) * 1.05;
          workout.styleTop = top + 'rem'; // 0.75rem*1.4 = 15min
          workout.styleHeight = height + 'rem'; // 0.75rem*1.4 = 15min
          day.workouts.push(workout);
        }
      });
    });
  }

  public refreshWorkouts(): void {
    this.workoutInstanceService.getByCoachIdAndDateInterval(this.selectedCoach.id, this.firstDisplayedDay, this.lastDisplayedDay)
      .then((workoutInstances) => {
        this.displayedWorkouts = workoutInstances;
        this.displayWorkout();
      });
  }

  public delete(workout: Workout): void {
    // this.workoutService
    //     .delete(workout.id)
    //     .then(() => {
    //     this.displayedWorkouts = this.displayedWorkouts.filter((w) => w !== workout);
    //     });
  }

  public addworkout(date: Date, hour: number, minute: number) {
    date.setHours(hour);
    date.setMinutes(minute);
    let workoutInstance = new WorkoutInstance(this.selectedCoach, date);
    workoutInstance.startdate = date;
    let dialogRef = this.dialog.open(AddSessionModalComponent, {
        data: {workoutInstance},
    });
    dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
            this.refreshDisplayedDays();
        }
    });
  }

  public changeDisplayStyle(style: string) {
    this.displayStyle = style;
    this.refreshDisplayedDays();
  }

  public backwardSelectedDay() {
    let nbDisplayedDay: number;
    if (this.displayStyle === '3days') {
      nbDisplayedDay = -3;
    } else {
      nbDisplayedDay = -7;
    }
    this.translateDateBoundaries(nbDisplayedDay);
    this.refreshDisplayedDays();
  }

  public forwardSelectedDay() {
    let nbDisplayedDay: number;
    if (this.displayStyle === '3days') {
      nbDisplayedDay = 3;
    } else {
      nbDisplayedDay = 7;
    }
    this.translateDateBoundaries(nbDisplayedDay);
    this.refreshDisplayedDays();
  }

  private dateDiff(date1: Date, date2: Date) {
    let timeDiff = date1.getTime() - date2.getTime();
    return (timeDiff / (24 * 3600 * 1000));
  }

  private setDateBoundaries() {
    if (this.displayStyle === '3days') {
      this.lastDisplayedDay = this.getRelativeDate(this.firstDisplayedDay, 2);
    } else {
      this.firstDisplayedDay = this.getDayXOfWeekOf(this.firstDisplayedDay, 1);
      this.lastDisplayedDay = this.getRelativeDate(this.firstDisplayedDay, 6);
    }
    this.firstDisplayedDay.setUTCHours(0, 0, 0, 0); // should check use of UTC or standard
    this.lastDisplayedDay.setUTCHours(23, 59, 59, 0); // should check use of UTC or standard
  }

  private getRelativeDate(date: Date, nbDay: number): Date {
    let relativeDate = new Date(date);
    relativeDate.setTime(date.getTime() + nbDay * 24 * 3600 * 1000);
    return relativeDate;
  }

  private getDayXOfWeekOf(date: Date, dayX: number): Date {
    let ofDay = date.getDay() || 7; // transform sunday 0, in 7
    let dayDiff = dayX - ofDay;
    return this.getRelativeDate(date, dayDiff);
  }

  private translateDateBoundaries(nbDay: number) {
    this.firstDisplayedDay.setTime(this.firstDisplayedDay.getTime() + nbDay * 24 * 3600 * 1000);
    this.lastDisplayedDay.setTime(this.lastDisplayedDay.getTime() + nbDay * 24 * 3600 * 1000);
  }

  private refreshDisplayedDays() {
    this.displayedDays = new Array();
    for (let date = new Date(this.firstDisplayedDay); date.getTime() < this.lastDisplayedDay.getTime(); date.setTime(date.getTime() + 24 * 3600 * 1000)) {
      this.displayedDays.push(new Day(new Date(date)));
    }
    this.refreshWorkouts();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
