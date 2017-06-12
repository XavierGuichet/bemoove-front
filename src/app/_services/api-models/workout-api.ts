import { Workout } from '../../models/workout';

export class WorkoutApi {
    public title: string;
    public sport: string;
    public startdate: Date;
    public enddate: Date;
    public duration: string;
    public nbTicketAvailable: number;
    public nbTicketBooked: number;
    public price: number;
    public address: any;
    public photo: any;
    public description: string;
    public outfit: string;
    public notice: string;
    public tags: string[];

    constructor(workout: Workout) {
        this.title = workout.title;
        this.startdate = workout.startdate;
        this.enddate = workout.enddate;
        this.duration = workout.duration;
        this.nbTicketAvailable = workout.nbTicketAvailable;
        this.nbTicketBooked = 0 ;
        this.price = workout.price;
        this.description = workout.description;
        this.outfit = workout.outfit;
        this.notice = workout.notice;

        if ( workout.sport.id ) {
            this.sport = '/sports/' + workout.sport.id;
        }
        if ( workout.address.id ) {
            this.address = '/addresses/' + workout.address.id;
        }
        if ( workout.photo.id ) {
            this.photo = '/images/' + workout.photo.id;
        }

        this.tags = new Array();
        for ( let tag of workout.tags ) {
            this.tags.push('/tags/' + tag.id);
        }
    }
}
