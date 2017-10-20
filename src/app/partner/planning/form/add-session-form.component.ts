import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Coach,
  Workout,
  WorkoutInstance } from '../../../models/index';

import { WorkoutInstanceService,
  CoachService,
  WorkoutService,
  SpaceService } from '../../../_services/index';

@Component({
  selector: 'add-session-form',
  templateUrl: 'add-session-form.component.html'
})

export class AddSessionFormComponent implements OnInit {
  public alertNoCoach: any;
  public alertNoWorkout: any;
  public formReady = false;
  public loading = false;

  public workoutInstanceForm: FormGroup;
  @Input()
  public workoutInstance: WorkoutInstance;
  @Output()
  public onSuccess = new EventEmitter<boolean>();
  public limitedWorkoutInstance: WorkoutInstance;

  public workouts: Workout[] = new Array();
  public coaches: Coach[] = new Array();

  public formErrors = {
    workout: '',
    coach: '',
    startdate: '',
    starttime: '',
    nbTicketAvailable: ''
  };

  public validationMessages = {
    workout: {
      required: 'Sélectionnez la séance de cette session'
    },
    coach: {
      required: 'Sélectionnez un coach'
    },
    startdate: {
      required: 'Veuillez choisir la date de cette session'
    },
    starttime: {
      required: 'Veuillez choisir l\'heure de début de cette session'
    },
    nbTicketAvailable: {
      required: 'Veuillez définir le nombre de place disponible à la réservation'
    },
  };

  public ngbTomorrow: { year: number, month: number, day: number };

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService,
    private workoutInstanceService: WorkoutInstanceService,
    private coachService: CoachService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private router: Router,
    private spaceService: SpaceService
  ) {
  }

  public ngOnInit(): void {
    let tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    this.ngbTomorrow = this.ngbDateParserFormatter.parse(tomorrow.toISOString());

    Promise.all([this.coachService.getMyCoaches(), this.workoutService.getMyWorkouts()])
      .then((results) => {
        this.coaches = results[0];
        if (!this.coaches.length) {
            this.alertNoCoach = { type: 'error', title: 'Aucun coach', content: '.' };
        }
        this.workouts = results[1];
        if (!this.workouts.length) {
            this.alertNoWorkout = { type: 'error', title: 'Aucune séance type', content: '' };
        }
        if (this.coaches.length && this.workouts.length) {
            this.buildForm();
            // Rappel
            // Pour qu'un select soit prechoisi, il faut bien donner au patch value l'objet present dans sa liste
            // et non pas un objet equivalent
            let selectcoach = this.coaches.find( (coach) => coach.id === this.workoutInstance.coach.id );
            this.workoutInstanceForm.patchValue({ coach: selectcoach });
            this.formReady = true;
        }
      })
      .catch(this.handleError);
  }

  public onSubmit(): void {
    this.limitedWorkoutInstance = this.prepareLimitedWorkoutInstance();
    this.loading = true;
    this.workoutInstanceService.create(this.limitedWorkoutInstance)
      .subscribe((workoutInstance) => {
        this.workoutInstance = workoutInstance;
        this.loading = false;
        this.onSuccess.emit(true);
      });
  }

  private prepareLimitedWorkoutInstance(): WorkoutInstance {
    const form = this.workoutInstanceForm;
    const formModel = this.workoutInstanceForm.value;

    const limitedWorkoutInstance: WorkoutInstance = new WorkoutInstance();

    limitedWorkoutInstance.startdate = new Date(this.ngbDateParserFormatter.format(formModel.startdate));
    limitedWorkoutInstance.startdate.setHours(formModel.starttime.hour, formModel.starttime.minute);
    limitedWorkoutInstance.workout = formModel.workout;
    limitedWorkoutInstance.nbTicketAvailable = parseInt(formModel.nbTicketAvailable, 10);
    limitedWorkoutInstance.coach = formModel.coach;

    return limitedWorkoutInstance;
  }

  private buildForm(): void {
    this.workoutInstanceForm = this.fb.group({
      coach: [this.workoutInstance.coach, [
        Validators.required,
      ]
      ],
      startdate: [this.ngbDateParserFormatter.parse(this.workoutInstance.startdate.toISOString()), [
        Validators.required,
      ]
      ],
      starttime: [{ hour: this.workoutInstance.startdate.getHours(), minute: this.workoutInstance.startdate.getMinutes() }, [
        Validators.required,
      ]
      ],
      workout: [this.workoutInstance.workout, [
        Validators.required,
      ]
      ],
      nbTicketAvailable: [this.workoutInstance.nbTicketAvailable, [
        Validators.required,
      ]
      ],
    });

    this.workoutInstanceForm.valueChanges
      .subscribe((data) => this.onValueChanged(this.workoutInstanceForm, data));

    // (re)set validation messages.
    this.onValueChanged(this.workoutInstanceForm);
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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
