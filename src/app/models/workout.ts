import { Tag } from './tag';
import { Sport } from './sport';
import { Address } from './address';
import { Image } from './image';

export class Workout {
    id: number;
    startdate: Date;
    enddate: Date;
    duration: string;
    placeType: string;
    nbTicketAvailable: number;
    nbTicketBooked: number;
    soldOut: boolean;
    price: number;
    coach: number;
    sport: any;
    subsport: string;
    soloTraining: boolean;
    difficulty: string;
    notation: number;
    address: any;
    description: string;
    tags: any[];
    addedExistingTags: Tag[];
    addedNewTags: Tag[];
    title: string;
    photo: Image;
    favorite: boolean;

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
