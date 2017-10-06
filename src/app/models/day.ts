import { WorkoutInstance } from './index';
export class Day {
    public date: Date;
    public workouts: WorkoutInstance[];
    constructor(date: Date = new Date()) {
        this.date = date;
        this.workouts = [];
    }
}
