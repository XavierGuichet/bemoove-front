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

    constructor(
    ) {
        this.sport = new Sport();
        this.address = new Address();
        this.startdate = new Date();
        this.enddate = new Date();
        this.tags = new Array();
        this.photo = new Image();
    }

}
