import { Workout } from '../../../models/workout';

export class WorkoutApi {
  public title: string;
  public sport: string;
  public duration: number;
  public price: number;
  public address: any;
  public photoSquare: any;
  public photoWide: any;
  public description: string;
  public outfit: string;
  public notice: string;
  public tags: string[];

  constructor(workout: Workout) {
    this.title = workout.title;
    this.duration = workout.duration;
    this.price = workout.price;
    this.description = workout.description;
    this.outfit = workout.outfit;
    this.notice = workout.notice;

    if (workout.sport.id) {
      this.sport = '/sports/' + workout.sport.id;
    }
    if (workout.address.id) {
      this.address = '/addresses/' + workout.address.id;
    }
    if (workout.photoSquare.id) {
      this.photoSquare = '/images/' + workout.photoSquare.id;
    }
    if (workout.photoWide.id) {
      this.photoWide = '/images/' + workout.photoWide.id;
    }

    this.tags = new Array();
    for (let tag of workout.tags) {
      if (tag.id) {
        this.tags.push('/tags/' + tag.id);
      }
    }
  }
}
