import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Headers } from '@angular/http';

import { NgbDateStruct, NgbTimeStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { BMReactFormComponent } from '../../../../form/bm-react-form/bm-react-form.component';

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

export class WorkoutInstanceFormComponent extends BMReactFormComponent implements OnInit {
  public formResult: any;
  public loading: boolean;
  public formReady: boolean = false;

  public workoutInstanceForm: FormGroup;
  public workoutInstance: WorkoutInstance = new WorkoutInstance();

  public workoutInstances: WorkoutInstance[] = new Array();
  public newWorkoutInstances: WorkoutInstance[] = new Array();
  public workout: Workout;

  public formErrors = {
    startdate: '',
    starttime: '',
    nbTicketAvailable: '',
    workout: '',
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
    workout: {
      required: 'Veuillez sélectionner une séance type.'
    },
    coach: {
      required: 'Veuillez sélectionner le coach qui encadre ce cours.'
    }
  };

  public coaches: Coach[] = new Array();

  public now = new Date();
  public ngbTomorrow: NgbDateStruct;
  public selectedStartDate: NgbDateStruct;
  public selectedStartTime: NgbTimeStruct;

  constructor(
    private fb: FormBuilder,
    private businessService: BusinessService,
    private coachService: CoachService,
    private workoutService: WorkoutService,
    private workoutInstanceService: WorkoutInstanceService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private route: ActivatedRoute,
    private spaceService: SpaceService) {
    super();
  }

  public ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.workoutService.getWorkout(+params['id']))
      .subscribe((workout) => {
        this.workoutInstance.workout = workout;
        this.workoutInstanceService.getByWorkoutId(workout.id).then(
          (workoutInstances) => this.workoutInstances = workoutInstances
        );
        this.coachService.getMyCoaches().then((coaches) => {
          this.coaches = coaches;
          this.workoutInstance.coach = coaches[0];
        });
        this.buildForm();
        this.formReady = true;
      });

    let tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    this.ngbTomorrow = this.ngbDateParserFormatter.parse(tomorrow.toISOString());

  }

  public forceIntegerNbTicket() {
    this.workoutInstanceForm.value.nbTicketAvailable = this.toInteger(this.workoutInstanceForm.value.nbTicketAvailable);
    if (!this.isNumber(this.workoutInstanceForm.value.nbTicketAvailable)) {
      this.workoutInstanceForm.value.nbTicketAvailable = 1;
    }
  }

  public removeWorkoutInstance(workoutInstance: WorkoutInstance): void {
    this.workoutInstances = this.workoutInstances.filter(
      (object) =>
        object !== workoutInstance
    );
  }

  public saveWorkoutInstances(): void { // TODO a check
    this.loading = true;
    while (this.newWorkoutInstances.length > 0) {
      let newworkoutInstance = this.newWorkoutInstances.shift();
      this.workoutInstanceService.create(newworkoutInstance)
        .then(
        (workoutInstance) => {
          this.workoutInstances.push(workoutInstance);
          this.loading = false;
        });
    }
  }

  public addWorkoutInstance() {
    let workoutInstance = this.createObjectFromModel();
    this.newWorkoutInstances.push(workoutInstance);
  }

  protected createNestedEntities(workoutInstance: WorkoutInstance): Promise<WorkoutInstance> {
    return Promise.resolve(workoutInstance);
  }

  protected createObjectFromModel(): WorkoutInstance {
    // TODO a check
    const form = this.workoutInstanceForm;
    const formModel = this.workoutInstanceForm.value;

    let workoutInstance = new WorkoutInstance();

    let startdate = new Date(this.ngbDateParserFormatter.format(formModel.startdate));
    startdate.setHours(formModel.starttime.hour);
    startdate.setMinutes(formModel.starttime.minute);
    workoutInstance.startdate = startdate;

    let endDate = new Date();
    endDate.setTime(startdate.getTime() + formModel.workout.duration * 60 * 1000);
    workoutInstance.enddate = endDate;

    workoutInstance.coach = formModel.coach;
    workoutInstance.nbTicketAvailable = formModel.nbTicketAvailable;
    workoutInstance.workout = formModel.workout;
    return workoutInstance;
  }

  protected buildForm(): void {
    this.workoutInstanceForm = this.fb.group({
      startdate: [this.ngbTomorrow, [
        Validators.required,
      ]
      ],
      starttime: [this.selectedStartTime, [ // TODO a check
        Validators.required,
      ]
      ],
      workout: [this.workoutInstance.workout, [ // TODO a check
        Validators.required,
      ]
      ],
      coach: [this.workoutInstance.coach, [ // TODO a check
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

    this.onValueChanged(this.workoutInstanceForm); // (re)set validation messages now
  }

  private isNumber(value: any): boolean {
    return !isNaN(this.toInteger(value));
  }

  private toInteger(value: any): number {
    return parseInt(`${value}`, 10);
  }
}
