import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Workout,
    WorkoutInstance,
    Coach } from '../../../../models/index';

import { SpaceService,
    BusinessService,
  CoachService,
  WorkoutService,
  WorkoutInstanceService } from '../../../../_services/index';

@Component({
  selector: 'workout-instance-form',
  templateUrl: './workout-instance-form.component.html'
})

export class WorkoutInstanceFormComponent implements OnInit {
  public loading = false;
  public workoutInstances: WorkoutInstance[] = new Array();
  public newWorkoutInstances: WorkoutInstance[] = new Array();
  public formModel: WorkoutInstance = new WorkoutInstance();
  public workoutInstanceForm: FormGroup;
  public workout: Workout;

  public formErrors = {
    startdate: '',
    starttime: '',
    nbTicketAvailable: '',
    coach: ''
  };

  public validationMessages = {
    startdate: {
      required: 'startdate is required.',
    },
    starttime: {
      required: 'starttime is required.',
    },
    nbTicketAvailable: {
      required: 'Un nombre de place est nécessaire.',
    },
    coach: {
      required: 'Veuillez sélectionner le coach qui encadre ce cours.'
    }
  };

  public coaches: Coach[] = new Array();

  public now = new Date();
  public ngbTomorrow: { year: number, month: number, day: number };
  public selectedStartDate: { year: number, month: number, day: number };
  public selectedStartTime: { hour: number, minute: number, second: number };
  public duration: { hour: number, minute: number, second: number };

  constructor(
    private fb: FormBuilder,
    private businessService: BusinessService,
    private coachService: CoachService,
    private workoutService: WorkoutService,
    private workoutInstanceService: WorkoutInstanceService,
    private route: ActivatedRoute,
    private spaceService: SpaceService) {
        this.route.params
          .switchMap( (params: Params) => this.workoutService.getWorkout(+params['id']))
          .subscribe( (workout) => {
              this.workout = workout;
              this.workoutInstanceService.getByWorkoutId(this.workout.id).then(
                  (workoutInstances) => this.workoutInstances = workoutInstances
              );
          });
  }

  public removeWorkoutInstance(workoutInstance: WorkoutInstance): void {
      this.workoutInstances = this.workoutInstances.filter(
          (object) =>
              object !== workoutInstance
          );
  }

  public saveWorkoutInstances(): void {
      this.loading = true;
      while (this.newWorkoutInstances.length > 0) {
          let workoutInstance = this.newWorkoutInstances.shift();
          this.workoutInstanceService.create(workoutInstance)
                      .subscribe(
                      (data) => {
                        this.workoutInstances.push(data);
                        this.loading = false;
                      },
                      (error) => {
                        this.loading = false;
                      });
      }
  }

  public ngOnInit(): void {
    this.buildForm();

    this.setStartDate();

    this.coachService.getMyCoaches().then((coaches) => {
        this.coaches = coaches;
    });

    let tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    this.ngbTomorrow = {
      year: tomorrow.getFullYear(),
      month: tomorrow.getMonth() + 1,
      day: tomorrow.getDate()
    };
  }

  public forceIntegerNbTicket() {
    this.formModel.nbTicketAvailable = this.toInteger(this.formModel.nbTicketAvailable);
    if (!this.isNumber(this.formModel.nbTicketAvailable)) {
      this.formModel.nbTicketAvailable = 1;
    }
  }

  public setStartDate() {
    if (this.formModel.startdate) {
      this.selectedStartDate = {
        year: this.formModel.startdate.getFullYear(),
        month: this.formModel.startdate.getMonth() + 1,
        day: this.formModel.startdate.getDate()
      };
      this.selectedStartTime = {
        hour: this.formModel.startdate.getHours(),
        minute: this.formModel.startdate.getMinutes(),
        second: 0
      };
    } else {
      this.selectedStartDate = { year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate() };
      this.selectedStartTime = {
        hour: this.now.getHours(),
        minute: this.now.getMinutes(),
        second: 0
      };
    }
      this.duration = {
        hour: 1,
        minute: 0,
        second: 0
      };
    this.recalcMainworkoutDates();
  }

  public recalcMainworkoutDates() {
    this.formModel.startdate = new Date(this.selectedStartDate.year,
      this.selectedStartDate.month - 1,
      this.selectedStartDate.day,
      this.selectedStartTime.hour,
      this.selectedStartTime.minute,
      this.selectedStartTime.second);
    this.formModel.enddate = new Date(this.formModel.startdate.getTime() + (this.duration.hour * 60 + this.duration.minute) * 60 * 1000);
  }

  public addWorkoutInstance() {
      let addedWorkoutInstance = new WorkoutInstance();
      addedWorkoutInstance.startdate = this.formModel.startdate;
      addedWorkoutInstance.coach = this.formModel.coach;
      addedWorkoutInstance.nbTicketAvailable = this.formModel.nbTicketAvailable;
      addedWorkoutInstance.workout = this.workout;
      this.newWorkoutInstances.push(addedWorkoutInstance);
  }

  private buildForm(): void {
    this.workoutInstanceForm = this.fb.group({
      startdate: [this.selectedStartDate, [
        Validators.required,
      ]
      ],
      starttime: [this.selectedStartTime, [
        Validators.required,
      ]
      ],
      coach: [this.coaches[0], [
        Validators.required,
      ]
      ],
      nbTicketAvailable: [5, [
        Validators.required,
      ]
      ]
    });

    this.workoutInstanceForm.valueChanges
      .subscribe((data) => this.onValueChanged(this.workoutInstanceForm, data));

    const startdateControl = this.workoutInstanceForm.get('startdate');
    startdateControl.valueChanges.forEach(
      (value: string) => this.recalcMainworkoutDates()
    );
    const starttimeControl = this.workoutInstanceForm.get('starttime');
    starttimeControl.valueChanges.forEach(
      (value: string) => this.recalcMainworkoutDates()
    );
    const coachControl = this.workoutInstanceForm.get('coach');
    coachControl.valueChanges.forEach(
      (value: Coach) => this.formModel.coach = value
    );
    this.onValueChanged(this.workoutInstanceForm); // (re)set validation messages now
  }

  private isNumber(value: any): boolean {
    return !isNaN(this.toInteger(value));
  }

  private toInteger(value: any): number {
    return parseInt(`${value}`, 10);
  }

  private onValueChanged(form, data?: any): void {
    const formErrors = this.formErrors;
    this.formErrors = this.recursiveCheck(form, formErrors);
  }

  private recursiveCheck(form, formErrors, validationprefix = '') {
    if (validationprefix !== '') {
      validationprefix += '.';
    }
    for (const field in formErrors) {
      if (typeof formErrors[field] === 'string') {
        const control = form.get(validationprefix + field);
        formErrors[field] = this.checkControlError(control, validationprefix + field);
      } else if (typeof this.formErrors[field] === 'object') {
        let prefix = validationprefix + field;
        formErrors[field] = this.recursiveCheck(this.formErrors[field], prefix);
      }
    }
    return formErrors;
  }

  private checkControlError(control, field) {
    let errorMessages = '';
    if (control && control.dirty && !control.valid) {
      const messages = this.validationMessages[field];
      for (const key in control.errors) {
        if (control.errors.hasOwnProperty(key)) {
          errorMessages += messages[key] + ' ';
        }
      }
    }
    return errorMessages;
  }
}
