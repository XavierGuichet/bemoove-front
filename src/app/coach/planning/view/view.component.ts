import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Workout } from '../../../models/workout';

import { WorkoutDateProvider } from '../../workoutdate.provider';
import { WorkoutService } from '../../../_services/workout.service';
import { SpaceService } from '../../../_services/space.service';

@Component({
    selector: 'planning-view',
    styleUrls: [ './view.component.scss' ],
    templateUrl: 'view.component.html'
})

export class ViewComponent implements OnInit {
    public displayEarlyMorning: boolean = false;
    public displayLateEvening: boolean = false;
    public selectedDay: Date;
    public firstDisplayedDay: Date;
    public lastDisplayedDay: Date;
    public displayedDays: Date[] = [];
    public displayStyle: string = '3days';
    public days: any = [1, 2, 3];
    public hours: any = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    public quarters: any = [0, 15, 30, 45];
    public commingWorkouts: Workout[];
    public pastWorkouts: Workout[];
    constructor(
        private spaceService: SpaceService,
        private router: Router,
        private workoutService: WorkoutService,
        private WorkoutDateProvider: WorkoutDateProvider
    ) {
        this.selectedDay = new Date();
        this.firstDisplayedDay = new Date();
        this.lastDisplayedDay = new Date();
    }

    public ngOnInit(): void {
        this.changeDisplayedDays();
        this.getCommingWorkoutByCoachId(this.spaceService.getUserId());
    }

    public getCommingWorkoutByCoachId(id: number): void {
        this.workoutService.getCommingWorkoutByCoachId(id)
                   .then((workouts) => this.commingWorkouts = workouts);
    }

    public getPastWorkoutByCoachId(id: number): void {
        this.workoutService.getPastWorkoutByCoachId(id)
                   .then((workouts) => this.pastWorkouts = workouts);
    }

    public delete(workout: Workout): void {
        this.workoutService
            .delete(workout.id)
            .then(() => {
            this.commingWorkouts = this.commingWorkouts.filter((w) => w !== workout);
            this.pastWorkouts = this.pastWorkouts.filter((w) => w !== workout);
            });
    }

    public addworkout(date: Date, hour: number, minute: number) {
        date.setHours(hour);
        date.setMinutes(minute);
        this.WorkoutDateProvider.setDate(date);
        this.router.navigate(['/coach/workout/add']);
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
            this.displayedDays = [new Date(), new Date(), new Date()];
            this.displayedDays[0].setTime(this.selectedDay.getTime() - 24 * 3600 * 1000);
            this.firstDisplayedDay = new Date();
            this.firstDisplayedDay.setTime(this.selectedDay.getTime() - 24 * 3600 * 1000);
            this.displayedDays[1].setTime(this.selectedDay.getTime());
            this.displayedDays[2].setTime(this.selectedDay.getTime() + 24 * 3600 * 1000);
            this.lastDisplayedDay = new Date();
            this.lastDisplayedDay.setTime(this.selectedDay.getTime() + 24 * 3600 * 1000);
        } else {
            this.displayedDays = [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()];
            let weekDay = this.selectedDay.getUTCDay();
            this.lastDisplayedDay.setTime(this.displayedDays[2].getTime());
            let max = 7 - weekDay;
            let min = max + 1 - 7;
            let i = 0;
            for ( min; min <= max; min++) {
                if (i === 0) {
                    this.firstDisplayedDay = new Date();
                    this.firstDisplayedDay.setTime(this.selectedDay.getTime() + min  *  24 * 3600 * 1000);
                } else if (i === 7) {
                    this.lastDisplayedDay = new Date();
                    this.lastDisplayedDay.setTime(this.selectedDay.getTime() + min  *  24 * 3600 * 1000);
                }
                this.displayedDays[i].setTime(this.selectedDay.getTime() + min  *  24 * 3600 * 1000);
                i++;
            }
        }
    }

    get diagnostic() { return JSON.stringify(this.commingWorkouts); }
}
