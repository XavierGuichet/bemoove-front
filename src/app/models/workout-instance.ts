import { BMImage, Coach, Workout } from './index';

export class WorkoutInstance {
    public id: number;
    public coach: Coach;
    public workout: Workout;
    public startdate: Date;
    public enddate: Date;
    public nbTicketAvailable: number;
    public nbTicketBooked: number;
    public styleTop: string;
    public styleHeight: string;

    constructor(coach = new Coach(), startdate = new Date(), enddate = new Date(), tags = new Array(), photo = new BMImage()
    ) {
        this.coach = coach;
        if (startdate instanceof Date) {
        this.startdate = new Date(startdate);
        } else { this.startdate = startdate; }
        if (enddate instanceof Date) {
        this.enddate = new Date(enddate);
        } else { this.enddate = enddate; }
    }
}
