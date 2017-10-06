import { WorkoutInstance } from '../../models/index';

export class WorkoutInstanceApi {
    public id: number;
    public coach: string;
    public workout: string;
    public startdate: Date;
    public enddate: Date;
    public nbTicketAvailable: number;
    public nbTicketBooked: number;

    constructor(workoutInstance: WorkoutInstance
    ) {
        this.startdate = workoutInstance.startdate;
        this.enddate = workoutInstance.enddate;
        this.nbTicketAvailable = workoutInstance.nbTicketAvailable;
        this.nbTicketBooked = 0;

        if ( workoutInstance.coach.id ) {
            this.coach = '/coaches/' + workoutInstance.coach.id;
        }
        if ( workoutInstance.workout.id ) {
            this.workout = '/workouts/' + workoutInstance.workout.id;
        }
    }
}
