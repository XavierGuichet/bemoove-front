import { Workout }          from './workout';
export class Day {
    public date: Date;
    public workouts: Workout[];
    constructor(date: Date, workouts: Workout[]) {
        this.date = date;
        this.workouts = workouts;
    }
}
