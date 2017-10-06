import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WorkoutBlockComponent } from './workout-block/workout-block.component';

import { Workout } from '../../../models/workout';

import { WorkoutService } from '../../../_services/workout.service';
import { SpaceService } from '../../../_services/space.service';

@Component({
  selector: 'workout-list-display-maconnery',
  templateUrl: 'workout-list-display-maconnery.component.html',
  styleUrls: ['./workout-list-display-maconnery.component.scss']
})

export class WorkoutListMaconneryComponent implements OnInit {
  public workouts: Workout[] = new Array();
  public tommorowWorkouts: Workout[] = new Array();
  public thisWeekWorkouts: Workout[] = new Array();
  public nextWeekWorkouts: Workout[] = new Array();
  public afterWorkouts: Workout[] = new Array();
  constructor(
    private router: Router,
    private spaceService: SpaceService,
    private workoutService: WorkoutService
  ) { }

  public ngOnInit(): void {
    this.loadWorkouts();
    // TODO
  }

  public loadWorkouts(): void {
    const tommorowStart = this.getRelativeDay(new Date(), 1, 0, 0, 0);
    const in1Month = this.getRelativeDay(new Date(), 32, 23, 59, 0);
    this.workoutService.getWorkoutsByDateInterval(tommorowStart, in1Month)
      .then((workouts) => {
        this.workouts = workouts;
        this.splitWorkoutByDate();
      });
  }

  private splitWorkoutByDate() {
    const tommorowEnd = this.getRelativeDay(new Date(), 2, 0, 0, 0);
    // this.tommorowWorkouts = this.workouts.filter((workout) => {
    //   return new Date(workout.startdate) < tommorowEnd;
    // });

    const thisWeekEnd = this.getNextSunday(new Date(), 23, 59, 0);
    // if (tommorowEnd.getUTCDay() !== 0) {
    //     this.thisWeekWorkouts = this.workouts.filter((workout) => {
    //       return tommorowEnd < new Date(workout.startdate) && new Date(workout.startdate) < thisWeekEnd;
    //     });
    // }

    // below, nextsunday is recalc as using the variable modify it !!!
    // It's fucking weird, don't actually understand the reason
    const nextWeekEnd = this.getRelativeDay(this.getNextSunday(new Date(), 23, 59, 0), 7, 23, 59, 0);
    // this.nextWeekWorkouts = this.workouts.filter((workout) => {
    //   return thisWeekEnd < new Date(workout.startdate) && new Date(workout.startdate) < nextWeekEnd;
    // });

    // this.afterWorkouts = this.workouts.filter((workout) => {
    //   return nextWeekEnd < new Date(workout.startdate);
    // });

  }

  private getRelativeDay(fromDay: Date, nbDayFromToday: number, setHour: number, setMinute: number, setSecond: number): Date {
    const day = fromDay;
    day.setTime(day.getTime() + nbDayFromToday * 24 * 3600 * 1000);
    day.setHours(setHour, setMinute, setSecond, 0);
    return day;
  }

  private getNextSunday(fromDate: Date, setHour: number, setMinute: number, setSecond: number): Date {
    let weekDay = fromDate.getUTCDay();
    let nbDayFromNextSunday = 7 - weekDay;
    let nextSunday = this.getRelativeDay(fromDate, nbDayFromNextSunday, setHour, setMinute, setSecond);
    return nextSunday;
  }
}
