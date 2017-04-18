import { Workout }          from './workout';
export class Day {
    date: Date;
    workouts: Workout[];
    constructor(date: Date, workouts: Workout[]) {
        this.date = date;
        this.workouts = workouts;
    }
}
