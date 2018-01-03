import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { BMReactFormComponent } from '../../../form/bm-react-form/bm-react-form.component';

import { Coach,
  Workout,
  WorkoutInstance } from '../../../models/index';

import { WorkoutInstanceService,
  CoachService,
  WorkoutService } from '../../../_services/index';

@Component({
  selector: 'add-session-form',
  templateUrl: 'add-session-form.component.html'
})

export class AddSessionFormComponent extends BMReactFormComponent implements OnInit {
  public formResult: any;
  public loading: boolean;
  public formReady: boolean = false;

  public alertNoCoach: any;
  public alertNoWorkout: any;

  public workoutInstanceForm: FormGroup;
  @Input()
  public workoutInstance: WorkoutInstance;
  @Output()
  public onSuccess = new EventEmitter<boolean>();

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
    private router: Router
  ) {
    super();
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
          let selectcoach = this.coaches.find((coach) => coach.id === this.workoutInstance.coach.id);
          this.workoutInstanceForm.patchValue({ coach: selectcoach });
          let defaultWorkout = this.workouts[0];
          this.workoutInstanceForm.patchValue({ workout: defaultWorkout });
          this.formReady = true;
        }
      })
      .catch(this.handleError);
  }

  public onSubmit(): void {
    this.loading = true;
    this.hideFormResult();

    let workoutInstance = this.createObjectFromModel();

    this.createNestedEntities(workoutInstance).then(
      (workoutInstanceWithCreatedNestedEntities) => {
        return Promise.all([
          workoutInstanceWithCreatedNestedEntities,
          this.createOrUpdate(this.workoutInstanceService, workoutInstanceWithCreatedNestedEntities)
        ]);
      })
      .then((result) => {
        this.loading = false;
        this.onSuccess.emit(true);
        this.showFormResult('success', 'Sauvegarde réussie');
      })
      .catch(this.handleError);
    //   this.showFormResult('error', 'Echec de la sauvegarde');
  }

  protected buildForm(): void {
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

  protected createNestedEntities(workoutInstance: WorkoutInstance): Promise<WorkoutInstance> {
    return Promise.resolve(workoutInstance);
  }

  protected createObjectFromModel() {
    const form = this.workoutInstanceForm;
    const formModel = this.workoutInstanceForm.value;

    const workoutInstance: WorkoutInstance = new WorkoutInstance();

    let startdate = new Date(this.ngbDateParserFormatter.format(formModel.startdate));
    startdate.setHours(formModel.starttime.hour, formModel.starttime.minute);
    workoutInstance.startdate = startdate;

    let endDate = new Date();
    endDate.setTime(startdate.getTime() + formModel.workout.duration * 60 * 1000);
    workoutInstance.enddate = endDate;

    workoutInstance.workout = formModel.workout;
    workoutInstance.nbTicketAvailable = parseInt(formModel.nbTicketAvailable, 10);
    workoutInstance.coach = formModel.coach;

    return workoutInstance;
  }
}
