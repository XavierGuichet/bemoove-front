import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers } from '@angular/http';
import { MatDialog, MatDialogRef } from '@angular/material';

import { BMReactFormComponent } from '../../../../form/bm-react-form/bm-react-form.component';
import { BMImageInputComponent } from '../../../../form/bm-image-input/bm-image-input.component';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { CompleterService, RemoteData, CompleterData } from 'ng2-completer';

import { ModalAddressFormComponent } from '../../modal/modal-address-form.component';

import {
  Workout,
  Sport,
  Address,
  Tag,
  BMImage
} from '../../../../models/index';

import {
  BusinessService,
  SportService,
  ImageService,
  AddressService,
  WorkoutService
} from '../../../../_services/index';

function validateCreatedObject(c: FormControl) {
  const value = c.value;
  if (isNaN(value.id)) {
    return { validateCreatedObject: true };
  }

  return null;
}

function validateImage(c: FormControl) {
  const value = c.value;
  if (!value.path && !value.base64data) {
    return { validateImage: true };
  }

  return null;
}

function validateDuration(c: FormControl) {
  const value = c.value;
  if (value === null || isNaN(value.hour) || isNaN(value.minute)) {
    return { validateDuration: true };
  }

  return null;
}

@Component({
  selector: 'workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss']
})

export class WorkoutFormComponent extends BMReactFormComponent implements OnInit {
  public formResult: any;
  public loading: boolean;
  public formReady: boolean = false;

  @Input()
  public workout: Workout;
  public limitedWorkout: Workout;
  public workoutForm: FormGroup;

  public formEditReadOnly = {
    main: {
      title: false,
      sport: true,
      duration: true,
      address: true,
      price: true,
    },
    details: {
      description: false,
      outfit: false,
      notice: false,
      tag: false
    }
  };

  public formErrors = {
    main: {
      title: '',
      sport: '',
      duration: '',
      address: '',
      price: '',
    },
    details: {
      description: '',
      outfit: '',
      notice: '',
      tag: ''
    },
    images: {
      photoSquare: '',
      photoWide: ''
    }
  };

  public validationMessages = {
    'main.title': {
      required: 'Un titre est nécessaire.',
    },
    'main.sport': {
      required: 'Un sport est nécessaire.',
    },
    'main.duration': {
      validateDuration: 'Une durée est requise.',
    },
    'main.address': {
      required: 'Veuillez choisir une adresse.',
      validateCreatedObject: 'Veuillez ajouter une adresse pour cette séance.'
    },
    'main.price': {
      required: 'Un prix est nécessaire.',
    },
    'details.description': {
      required: 'Veuillez entrez une description de votre séance.',
    },
    'details.outfit': {
      required: 'Veuillez entrez les informations concernant la tenue conseillé pour cette séance.',
    },
    'details.notice': {
      required: 'Veuillez entrez les informations complémentaire pour cette séance.',
    },
    'details.tag': {
    },
    'images.photoSquare': {
      validateImage: 'Veuillez choisir une photo, la découper et confirmer.'
    },
    'images.photoWide': {
      validateImage: 'Veuillez choisir une photo, la découper et confirmer.'
    }
  };

  public partnerAddresses: Address[] = new Array();

  public selectedSport: Sport;

  public sportDataService: RemoteData;

  public activeTab;

  private SportsUrl = process.env.API_URL + '/sports';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private businessService: BusinessService,
    private workoutService: WorkoutService,
    private sportService: SportService,
    private addressService: AddressService,
    private imageService: ImageService,
    private completerService: CompleterService,
    public dialog: MatDialog) {
    super();
    this.initAutoCompleters(completerService);
  }

  public initAutoCompleters(completerService: CompleterService): void {
    this.sportDataService = completerService.remote(
      this.SportsUrl + '?name=',
      'name',
      'name');

    this.sportDataService.headers(new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }));
  }

  public ngOnInit(): void {
    this.buildForm();

    this.addressService.getMyWorkoutAdresses()
      .then((addresses) => {
        if (addresses.length > 0) {
          this.partnerAddresses = addresses;
          // Rappel
          // Pour qu'un select soit prechoisi, il faut bien donner au patch value l'objet present dans sa liste
          // et non pas un objet equivalent
          let selectedAddress = addresses.find((address) => address.id === this.workout.address.id);
          if (!selectedAddress) {
            selectedAddress = addresses[0];
          }
          this.workoutForm.patchValue({ main: { address: selectedAddress } });
        }
      });
  }

  public selectSport(event) {
    if (event == null) {
      return;
    }
    if (event.title.trim().length === 0) {
      let newSport = new Sport();
      this.selectedSport = newSport;
      return;
    }
    if (event.originalObject == null && event.title.trim() !== this.workout.sport.name) {
      let newSport = new Sport();
      newSport.name = event.title.trim();
      this.selectedSport = newSport;
      return;
    }
    if (event.originalObject != null) {
      this.selectedSport = event.originalObject;
      return;
    }
  }

  get addressControl() {
    return this.workoutForm.get('main.address');
  }

  get photoSquareControl() {
    return this.workoutForm.get('images.photoSquare');
  }

  public confirmPhotoSquare(image: BMImage) {
    this.photoSquareControl.setValue(image);
  }

  get photoWideControl() {
    return this.workoutForm.get('images.photoWide');
  }

  public confirmPhotoWide(image: BMImage) {
    this.photoWideControl.setValue(image);
  }

  get tagcontrol() {
    return this.workoutForm.get('details.tags') as FormArray;
  }

  public removeTag(index: number) {
    this.tagcontrol.removeAt(index);
  }

  public addTag(tag: Tag) {
    if (tag.hasOwnProperty('name')) {
      this.tagcontrol.push(new FormControl(tag));
    }
  }

  /* tslint:disable:no-bitwise */
  public selectTag(tag: Tag) {
    const index = this.tagcontrol.value.indexOf(tag);
    if (!!~index) {
      this.removeTag(index);
    } else {
      this.addTag(tag);
    }
  }
  /* tslint:enable:no-bitwise */

  public showModalAddressFormComponent() {
    let dialogRef = this.dialog.open(ModalAddressFormComponent);
    dialogRef.afterClosed().subscribe((newAddress) => {
      if (newAddress instanceof Object) {
        this.partnerAddresses.push(newAddress);
        this.workout.address = newAddress;
        this.workoutForm.patchValue({ main: { address: this.workout.address } });
      }
    });
  }

  public goToDetails() {
    if (this.workoutForm.get('main').valid) {
      this.activeTab = 1;
    } else {
      const formErrors = this.formErrors.main;
      this.formErrors.main = this.recursiveCheck(this.workoutForm, formErrors, 'main', true);
    }
  }

  public goToImage() {
    if (this.workoutForm.get('details').valid) {
      this.activeTab = 2;
    } else {
      const formErrors = this.formErrors.details;
      this.formErrors.details = this.recursiveCheck(this.workoutForm, formErrors, 'details', true);
    }
  }

  public forceIntegerPrice() {
    this.workout.price = this.toInteger(this.workout.price);
    if (!this.isNumber(this.workout.price) || this.workout.price < 7) {
      this.workout.price = 7;
    }
  }

  public onSubmit() {
      if (!this.workoutForm.valid) {
          const formErrors = this.formErrors;
          this.formErrors = this.recursiveCheck(this.workoutForm, formErrors, '', true);
          return;
      }
    this.loading = true;
    let workout: Workout = this.createObjectFromModel();

    this.createNestedEntities(workout).then(
      (workoutWithCreatedNestedEntities) => {
        return Promise.all([
          workoutWithCreatedNestedEntities,
          this.createOrUpdate(this.workoutService, workoutWithCreatedNestedEntities)
        ]);
      })
      .then((result) => {
        this.loading = false;
        this.router.navigate(['/partner/workouts/list']);
      })
      .catch(this.handleError);
  }

  protected createObjectFromModel() {
    const formModel = this.workoutForm.value;
    const workout = new Workout();

    if (this.workout.id) {
      workout.id = this.workout.id;
    }

    workout.title = formModel.main.title;
    if (!!this.selectedSport) {
        workout.sport = this.selectedSport;
    }
    workout.duration = formModel.main.duration.hour * 60 + formModel.main.duration.minute;
    workout.address = formModel.main.address;
    workout.price = formModel.main.price;

    workout.description = formModel.details.description;
    workout.outfit = formModel.details.outfit;
    workout.notice = formModel.details.notice;
    workout.tags = formModel.details.tags;

    workout.photoSquare = formModel.images.photoSquare;
    workout.photoWide = formModel.images.photoWide;

    return workout;
  }

  protected buildForm(): void {
    this.workoutForm = this.fb.group({
      main: this.fb.group({
        title: [this.workout.title, [
          Validators.required,
        ]
        ],
        sport: [this.workout.sport.name, [
          Validators.required,
        ]
        ],
        duration: [this.toNgbTime(this.workout.duration), [
          validateDuration,
        ]
        ],
        address: [this.workout.address, [
          Validators.required,
          validateCreatedObject
        ]
        ],
        price: [this.workout.price, [
          Validators.required
        ]
        ]
      }),
      details: this.fb.group({
        description: [this.workout.description, [
          Validators.required,
        ]
        ],
        outfit: [this.workout.outfit, [
        ]
        ],
        notice: [this.workout.notice, [
        ]
        ],
        tags: this.fb.array(this.workout.tags || []),
      }),
      images: this.fb.group({
        photoSquare: [this.workout.photoSquare, [
          validateImage
        ]
        ],
        photoWide: [this.workout.photoWide, [
          validateImage
        ]
        ]
      })
    });

    this.workoutForm.valueChanges
      .subscribe((data) => this.onValueChanged(this.workoutForm, data));

    // This was used to render the preview
    // const titleControl = this.workoutForm.get('title');
    // titleControl.valueChanges.forEach(
    //   (value: string) => this.workout.title = value
    // );
    // const descriptionControl = this.workoutForm.get('description');
    // descriptionControl.valueChanges.forEach(
    //   (value: string) => this.workout.description = value
    // );
    // const outfitControl = this.workoutForm.get('outfit');
    // outfitControl.valueChanges.forEach(
    //   (value: string) => this.workout.description = value
    // );
    // const noticeControl = this.workoutForm.get('notice');
    // noticeControl.valueChanges.forEach(
    //   (value: string) => this.workout.description = value
    // );
    // const addressControl = this.workoutForm.get('address');
    // addressControl.valueChanges.forEach(
    //   (value: string) => this.workout.address = value
    // );
    this.onValueChanged(this.workoutForm); // (re)set validation messages now
  }

  protected createNestedEntities(workout: Workout): Promise<Workout> {
    let Promises: any[] = new Array();

    if (!workout.photoWide.id && workout.photoWide.base64data !== null) {
      Promises.push(this.imageService.create(workout.photoWide).then((image) => workout.photoWide = image));
    }
    //  else if (workout.photoWide.base64data !== null) {
    //   Promises.push(this.imageService.update(workout.photoWide).then((image) => workout.photoWide = image));
    // }

    if (!workout.photoSquare.id && workout.photoSquare.base64data !== null) {
      Promises.push(this.imageService.create(workout.photoSquare).then((image) => workout.photoSquare = image));
    }
    //  else if (workout.photoSquare.base64data !== null) {
    //   Promises.push(this.imageService.update(workout.photoSquare).then((image) => workout.photoSquare = image));
    // }

    if (!workout.sport.id) {
      Promises.push(this.sportService.create(workout.sport).then((sport) => workout.sport = sport));
    }

    if (Promises.length > 0) {
      return Promise.all(Promises).then(() => workout);
    } else {
      return Promise.resolve(workout);
    }
  }

  private toNgbTime(minutes: number) {
    return {
      hour: Math.ceil(minutes / 60),
      minute: minutes % 60,
      second: 0
    };
  }

  private isNumber(value: any): boolean {
    return !isNaN(this.toInteger(value));
  }

  private toInteger(value: any): number {
    return parseInt(`${value}`, 10);
  }

  get diagnostic() { return JSON.stringify(this.workout); }
  get diagnostic2() { return JSON.stringify(this.workoutForm.value); }
  get diagnosticsport() { return JSON.stringify(this.selectedSport); }
}
