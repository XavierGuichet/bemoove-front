import { Tag } from './tag';
import { Sport } from './sport';
import { Address } from './address';
import { Image } from './image';

export class Workout {
    public id: number;
    public coach: number;
    public title: string;
    public sport: any;
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
    public tags: Tag[];
    public styleTop: string;
    public styleHeight: string;

    constructor(sport = new Sport(), address = new Address(), startdate = new Date(), enddate = new Date(), tags = new Array(), photo = new Image()
    ) {
        this.sport = sport;
        this.address = address;
        if (startdate instanceof Date) {
        this.startdate = new Date(startdate);
        console.log(this.startdate);
        } else { this.startdate = startdate; }
        if (enddate instanceof Date) {
        this.enddate = new Date(enddate);
        } else { this.enddate = enddate; }
        this.tags = tags;
        this.photo = photo;
    }

}
