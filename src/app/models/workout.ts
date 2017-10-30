import { Address, Image, Sport, Tag } from './index';

export class Workout {
    public id: number;
    public title: string;
    public sport: any;
    public enddate: Date;
    public duration: number;
    public price: number;
    public address: any;
    public photoWide: any;
    public photoSquare: any;
    public description: string;
    public outfit: string;
    public notice: string;
    public tags: Tag[];
    public styleTop: string;
    public styleHeight: string;

    constructor(sport = new Sport(), address = new Address(),  tags = new Array(), photoWide = new Image(), photoSquare = new Image()
    ) {
        this.sport = sport;
        this.address = address;
        this.tags = tags;
        this.photoWide = photoWide;
        this.photoSquare = photoSquare;
    }
}
