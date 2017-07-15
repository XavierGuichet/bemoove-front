import { Injectable } from '@angular/core';

@Injectable()
export class WorkoutDateProvider {
  private mydate: Date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

  public getDate() {
    return this.mydate;
  }

  public setDate(date: Date) {
    this.mydate = date;
  }
}
