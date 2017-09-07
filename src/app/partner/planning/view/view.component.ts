import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Workout } from '../../../models/workout';
import { Day } from '../../../models/day';

import { WorkoutModalComponent } from '../workout-information/workout-modal.component';

import { WorkoutDateProvider } from '../../workoutdate.provider';
import { WorkoutService } from '../../../_services/workout.service';
import { SpaceService } from '../../../_services/space.service';

@Component({
    selector: 'planning-view',
    styleUrls: [ './view.component.scss' ],
    templateUrl: 'view.component.html'
})

export class ViewComponent implements OnInit {
    public tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    public displayEarlyMorning: boolean = false;
    public displayLateEvening: boolean = false;
    public selectedDay: Date;
    public firstDisplayedDay: Date;
    public lastDisplayedDay: Date;
    public displayedDays: Day[];
    public displayStyle: string = 'week';
    public hours: any = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    public quarters: any = [0, 15, 30, 45];
    public displayedWorkouts: Workout[];
    constructor(
        private spaceService: SpaceService,
        private router: Router,
        private workoutService: WorkoutService,
        private WorkoutDateProvider: WorkoutDateProvider,
        public dialog: MdDialog
    ) {
        this.selectedDay = new Date();
        this.firstDisplayedDay = new Date();
        this.lastDisplayedDay = new Date();
    }

    public ngOnInit(): void {
        this.changeDisplayedDays();
    }

    public showModalWorkoutInformationComponent(id: number) {
      let dialogRef = this.dialog.open(WorkoutModalComponent, {
          data: id,
        });
    }

    public displayWorkout() {
        let quarterHeight = 1.05;
        let hoursHeight = quarterHeight * 4 + 1 / 16;
        this.displayedWorkouts.forEach( (workout) => {
            let workoutstartDate = new Date(workout.startdate);
            this.displayedDays.forEach( (day) => {
                if (workoutstartDate.getDate() === day.date.getDate()
                    && workoutstartDate.getDate() === day.date.getDate()) {
                        let workoutEndDate = new Date(workout.enddate);
                        let hours = workoutEndDate.getHours() - workoutstartDate.getHours();
                        let minutes = workoutEndDate.getMinutes() - workoutstartDate.getMinutes();
                        let top = 2 + workoutstartDate.getHours() * hoursHeight + Math.ceil(workoutstartDate.getMinutes() / 15) * quarterHeight;
                        let height = (hours) * hoursHeight
                                        + Math.ceil( minutes / 15) * 1.05;
                        workout.styleTop = top + 'rem'; // 0.75rem*1.4 = 15min
                        workout.styleHeight = height + 'rem'; // 0.75rem*1.4 = 15min
                        day.workouts.push(workout);
                    }
            });
        });
    }

    public getWorkoutsByPartner(id: number, startdate: Date, lastdate: Date): void {
        this.workoutService.getWorkoutsByPartnerIdAndDateInterval(id, startdate, lastdate)
                   .then((workouts) => {
                       this.displayedWorkouts = workouts;
                       this.displayWorkout();
                   });
    }

    public delete(workout: Workout): void {
        this.workoutService
            .delete(workout.id)
            .then(() => {
            this.displayedWorkouts = this.displayedWorkouts.filter((w) => w !== workout);
            });
    }

    public addworkout(date: Date, hour: number, minute: number) {
        date.setHours(hour);
        date.setMinutes(minute);
        this.WorkoutDateProvider.setDate(date);
        this.router.navigate(['/partner/workout/add']);
    }

    public changeDisplayStyle(style: string) {
        this.displayStyle = style;
        this.changeDisplayedDays();
    }

    public setToToday() {
        let currentDate = new Date();
        this.selectedDay.setTime(currentDate.getTime());
        this.changeDisplayedDays();
    }

    public toggleEarlyMorning() {
        // TODO
    }

    public toggleLateEvening() {
        // TODO
    }

    public backwardSelectedDay() {
        if (this.displayStyle === '3days') {
            this.selectedDay.setTime(this.selectedDay.getTime() - 3 * 24 * 3600 * 1000);
        } else {
            this.selectedDay.setTime(this.selectedDay.getTime() - 7 * 24 * 3600 * 1000);
        }
        this.changeDisplayedDays();
    }

    public forwardSelectedDay() {
        if (this.displayStyle === '3days') {
            this.selectedDay.setTime(this.selectedDay.getTime() + 3 * 24 * 3600 * 1000);
        } else {
            this.selectedDay.setTime(this.selectedDay.getTime() + 7 * 24 * 3600 * 1000);
        }
        this.changeDisplayedDays();
    }

    private changeDisplayedDays() {
        if (this.displayStyle === '3days') {
            this.displayedDays = [new Day(), new Day(), new Day()];
            this.displayedDays[0].date.setTime(this.selectedDay.getTime() - 24 * 3600 * 1000);
            this.firstDisplayedDay = new Date();
            this.firstDisplayedDay.setTime(this.selectedDay.getTime() - 24 * 3600 * 1000);
            this.firstDisplayedDay.setHours(0, 0, 0, 0);
            this.displayedDays[1].date.setTime(this.selectedDay.getTime());
            this.displayedDays[2].date.setTime(this.selectedDay.getTime() + 24 * 3600 * 1000);
            this.lastDisplayedDay = new Date();
            this.lastDisplayedDay.setTime(this.selectedDay.getTime() + 24 * 3600 * 1000);
            this.lastDisplayedDay.setHours(23, 59, 59, 0);
        } else {
            this.displayedDays = [new Day(), new Day(), new Day(), new Day(), new Day(), new Day(), new Day()];
            let weekDay = this.selectedDay.getUTCDay();
            this.lastDisplayedDay.setTime(this.displayedDays[2].date.getTime());
            let max = 7 - weekDay;
            let min = max + 1 - 7;
            let i = 0;
            for ( min; min <= max; min++) {
                if (i === 0) {
                    this.firstDisplayedDay = new Date();
                    this.firstDisplayedDay.setTime(this.selectedDay.getTime() + min  *  24 * 3600 * 1000);
                    this.firstDisplayedDay.setHours(0, 0, 0, 0);
                } else if (i === 6) {
                    this.lastDisplayedDay = new Date();
                    this.lastDisplayedDay.setTime(this.selectedDay.getTime() + min  *  24 * 3600 * 1000);
                    this.lastDisplayedDay.setHours(23, 59, 59, 0);
                }
                this.displayedDays[i].date.setTime(this.selectedDay.getTime() + min  *  24 * 3600 * 1000);
                i++;
            }
        }
        this.getWorkoutsByPartner(this.spaceService.getUserId(),
                                this.firstDisplayedDay,
                                this.lastDisplayedDay);
    }

    get diagnostic() { return JSON.stringify(this.displayedWorkouts); }
}
