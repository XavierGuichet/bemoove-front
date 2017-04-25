import { Tag } from './tag';
import { Sport } from './sport';
import { Address } from './address';
import { Image } from './image';

export class Workout {
    public id: number;
    public startdate: Date;
    public enddate: Date;
    public duration: string;
    public placeType: string;
    public nbTicketAvailable: number;
    public nbTicketBooked: number;
    public soldOut: boolean;
    public price: number;
    public coach: number;
    public sport: any;
    public soloTraining: boolean;
    public subsport: string;
    public difficulty: string;
    public notation: number;
    public address: any;
    public description: string;
    public tags: any[];
    public addedExistingTags: Tag[];
    public addedNewTags: Tag[];
    public title: string;
    public photo: Image;
    public favorite: boolean;

    constructor(
    ) {
        this.sport = new Sport();
        this.address = new Address();
        this.startdate = new Date();
        this.enddate = new Date();
        this.tags = new Array();
        this.addedExistingTags = new Array();
        this.addedNewTags = new Array();
        this.photo = new Image();
    }

}
