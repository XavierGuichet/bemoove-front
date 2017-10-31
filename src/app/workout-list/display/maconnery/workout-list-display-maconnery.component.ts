import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WorkoutBlockComponent } from './workout-block/workout-block.component';

import { WorkoutInstance } from '../../../models/index';

import { SpaceService, WorkoutInstanceService } from '../../../_services/index';

@Component({
  selector: 'workout-list-display-maconnery',
  templateUrl: 'workout-list-display-maconnery.component.html',
  styleUrls: ['./workout-list-display-maconnery.component.scss']
})

export class WorkoutListMaconneryComponent implements OnInit {
  public workoutInstances: WorkoutInstance[] = new Array();
  public tommorowWorkouts: WorkoutInstance[] = new Array();
  public thisWeekWorkouts: WorkoutInstance[] = new Array();
  public nextWeekWorkouts: WorkoutInstance[] = new Array();
  public afterWorkouts: WorkoutInstance[] = new Array();
  constructor(
    private router: Router,
    private spaceService: SpaceService,
    private workoutInstanceService: WorkoutInstanceService
  ) { }

  public ngOnInit(): void {
    this.loadWorkouts();
    // TODO
  }

  public loadWorkouts(): void {
    const tommorowStart = this.getRelativeDay(new Date(), 1, 0, 0, 0);
    const in1Month = this.getRelativeDay(new Date(), 32, 23, 59, 0);
    this.workoutInstanceService.getWorkoutInstancesByDateInterval(tommorowStart, in1Month)
      .then((workoutInstances) => {
        this.workoutInstances = workoutInstances;
        this.splitWorkoutByDate();
      });
  }

  private splitWorkoutByDate() {
    const tommorowEnd = this.getRelativeDay(new Date(), 2, 0, 0, 0);
    this.tommorowWorkouts = this.workoutInstances.filter((workoutInstance) => {
      return new Date(workoutInstance.startdate) < tommorowEnd;
    });

    const thisWeekEnd = this.getNextSunday(new Date(), 23, 59, 0);
    if (tommorowEnd.getUTCDay() !== 0) {
        this.thisWeekWorkouts = this.workoutInstances.filter((workoutInstance) => {
          return tommorowEnd < new Date(workoutInstance.startdate) && new Date(workoutInstance.startdate) < thisWeekEnd;
        });
    }

    // below, nextsunday is recalc as using the variable modify it !!!
    // It's fucking weird, don't actually understand the reason
    const nextWeekEnd = this.getRelativeDay(this.getNextSunday(new Date(), 23, 59, 0), 7, 23, 59, 0);
    this.nextWeekWorkouts = this.workoutInstances.filter((workoutInstance) => {
      return thisWeekEnd < new Date(workoutInstance.startdate) && new Date(workoutInstance.startdate) < nextWeekEnd;
    });

    this.afterWorkouts = this.workoutInstances.filter((workoutInstance) => {
      return nextWeekEnd < new Date(workoutInstance.startdate);
    });

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
