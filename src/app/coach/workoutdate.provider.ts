import { Injectable } from '@angular/core';

@Injectable()
export class WorkoutDateProvider {
  private mydate: Date = new Date();

  public getDate() {
    return this.mydate;
  }

  public setDate(date: Date) {
    this.mydate = date;
  }
}
