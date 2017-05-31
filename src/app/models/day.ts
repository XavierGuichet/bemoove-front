import { Workout } from './workout';
export class Day {
    public date: Date;
    public workouts: Workout[];
    constructor() {
        this.date = new Date();
        this.workouts = [];
    }
}
