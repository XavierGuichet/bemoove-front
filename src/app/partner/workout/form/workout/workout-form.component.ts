import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Headers } from '@angular/http';
import { MdDialog, MdDialogRef } from '@angular/material';

import { BMReactFormComponent } from '../../../../form/bm-react-form/bm-react-form.component';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { CompleterService, RemoteData, CompleterData } from 'ng2-completer';

import { ModalAddressFormComponent  } from '../../modal/modal-address-form.component';

import { Workout,
  Sport,
  Address,
  Tag,
  Image } from '../../../../models/index';

import {
  BusinessService,
  SportService,
  ImageService,
  AddressService,
  TagService,
  WorkoutService } from '../../../../_services/index';

function validateCreatedObject(c: FormControl) {
  const value = c.value;
  if (isNaN(value.id)) {
    return { validateCreatedObject: true };
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
  public workoutForm: FormGroup;

  public formErrors = {
    startdate: '',
    starttime: '',
    title: '',
    sport: '',
    duration: '',
    address: '',
    price: '',
    nbTicketAvailable: '',
    description: '',
    outfit: '',
    notice: '',
    tag: ''
  };

  public validationMessages = {
    startdate: {
      required: 'startdate is required.',
    },
    starttime: {
      required: 'starttime is required.',
    },
    title: {
      required: 'Un titre est nécessaire.',
    },
    sport: {
      required: 'Un sport est nécessaire.',
    },
    duration: {
      required: 'Une durée est réquise.',
    },
    address: {
      required: 'Veuillez choisir une adresse.',
    },
    price: {
      required: 'Un prix est nécessaire.',
    },
    nbTicketAvailable: {
      required: 'Un nombre de place est nécessaire.',
    },
    description: {
      required: 'Veuillez entrez une description de votre séance.',
    },
    outfit: {
    },
    notice: {
    },
    tag: {
    }
  };

  public partnerAddresses: Address[] = new Array();
  public sports: Sport[];

  public duration: { hour: number, minute: number, second: number };

  public sportDataService: RemoteData;
  public tagDataService: RemoteData;

  public cropperData: any;
  public cropperSettings: CropperSettings;

  public activeTab;

  @ViewChild('cropper', undefined) public cropper: ImageCropperComponent;

  private SportsUrl = 'http://' + process.env.API_URL + '/sports';
  private TagsUrl = 'http://' + process.env.API_URL + '/tags';

  constructor(
    private fb: FormBuilder,
    private businessService: BusinessService,
    private workoutService: WorkoutService,
    private sportService: SportService,
    private addressService: AddressService,
    private imageService: ImageService,
    private tagService: TagService,
    private completerService: CompleterService,
    public dialog: MdDialog) {
    super();
    this.initAutoCompleters(completerService);
    this.initCropper();
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

    this.tagDataService = completerService.remote(
      this.TagsUrl + '?name=',
      'name',
      'name');

    this.tagDataService.headers(new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }));
  }

  public initCropper(): void {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 10;
    this.cropperSettings.height = 10;
    this.cropperSettings.croppedWidth = 300;
    this.cropperSettings.croppedHeight = 300;
    this.cropperSettings.canvasWidth = 600;
    this.cropperSettings.canvasHeight = 337;
    this.cropperSettings.keepAspect = true;

    this.cropperData = {};
  }

  public ngOnInit(): void {
    this.buildForm();

    this.addressService.getMyWorkoutAdresses()
      .then((addresses) => {
        if (addresses.length > 0) {
          this.partnerAddresses = addresses;
          this.workoutForm.patchValue({ address: this.partnerAddresses[0] });
        }
      });

    this.sportService.getAll().then((sports) => this.sports = sports);
  }

  public setWorkoutImageData() {
    this.workout.photo.base64data = this.cropperData.image;
  }

  public selectSport(event) {
    if (event == null || event.title.trim().length === 0) {
      return;
    }
    if (event.originalObject == null && event.title.trim() !== this.workout.sport.name) {
      let newSport = new Sport();
      newSport.name = event.title.trim();
      this.workout.sport = newSport;
      return;
    }
    if (event.originalObject != null) {
      this.workout.sport = event.originalObject;
      return;
    }
  }

  public selectTag(event) {
    if (event == null || event.title.trim().length === 0 ||
      this.workout.tags.filter((t) => t.name === event.title.trim()).length > 0
    ) {
      return;
    }
    if (event.originalObject != null) {
      this.workout.tags.push(event.originalObject);
      return;
    }
  }

  public addTag(event) {
    let tagName = this.workoutForm.value.tag.trim();
    if (tagName.length > 0) {
      let newTag = new Tag();
      newTag.name = tagName;
      this.tagService.create(newTag).subscribe(
        (data) => {
          this.workout.tags.push(data);
        },
        (error) => {
          alert('echec de l\'ajout du tag');
        });
      return;
    }
  }

  public removeTag(tag: Tag) {
    this.workout.tags = this.workout.tags.filter((t) => t !== tag);
  }

  public showModalAddressFormComponent() {
    let dialogRef = this.dialog.open(ModalAddressFormComponent);
    dialogRef.afterClosed().subscribe((newAddress) => {
      if (newAddress instanceof Object) {
        this.partnerAddresses.push(newAddress);
        this.workout.address = newAddress;
        this.workoutForm.patchValue({
          address: this.workout.address
        });
      }
    });
  }

  public forceIntegerPrice() {
    this.workout.price = this.toInteger(this.workout.price);
    if (!this.isNumber(this.workout.price) || this.workout.price < 7) {
      this.workout.price = 7;
    }
  }

  public createRelatedNewEntities() {
    let ObservableOfCreation: any[] = new Array();

    if (!this.workout.photo.id) {
      ObservableOfCreation.push(this.imageService.create(this.workout.photo).map((image) => this.workout.photo = image));
    }

    if (!this.workout.sport.id) {
      ObservableOfCreation.push(this.sportService.create(this.workout.sport).map((sport) => this.workout.sport = sport));
    }

    if (!this.workout.photo.id || !this.workout.sport.id) {
      return Observable.forkJoin(ObservableOfCreation).map(() => true);
    } else {
      return Observable.empty();
    }
  }

  public onSubmit() {
    this.createRelatedNewEntities().subscribe(() => {
      let saveWorkout = this.prepareSaveWorkout();
      this.loading = true;
      if (!this.workout.id) {
        this.workoutService.create(saveWorkout)
          .subscribe(
          (data) => {
            this.loading = false;
          },
          (error) => {
            this.loading = false;
          });
      } else {
        this.workoutService.update(saveWorkout)
          .subscribe(
          (data) => {
            this.loading = false;
          },
          (error) => {
            this.loading = false;
          });
      }
    }
    );
  }

  public prepareSaveWorkout() {
    const formModel = this.workoutForm.value;

    const saveWorkout: Workout = new Workout();

    saveWorkout.id = this.workout.id;

    saveWorkout.title = formModel.title;
    saveWorkout.sport = this.workout.sport;

    saveWorkout.address = formModel.address;
    saveWorkout.price = this.workout.price;

    saveWorkout.photo = this.workout.photo;
    saveWorkout.description = formModel.description;
    saveWorkout.outfit = formModel.outfit;
    saveWorkout.notice = formModel.notice;
    saveWorkout.tags = this.workout.tags;
    return saveWorkout;
  }

  private buildForm(): void {
    this.workoutForm = this.fb.group({
      title: [this.workout.title, [
        Validators.required,
      ]
      ],
      sport: [this.workout.sport.name, [
        Validators.required,
      ]
      ],
      duration: [this.workout.duration, [
        Validators.required,
      ]
      ],
      address: [this.workout.address, [
        Validators.required,
        validateCreatedObject
      ]
      ],
      price: [this.workout.price, [
        Validators.required,
      ]
      ],
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
      tag: [this.workout.tags, [
      ]
      ]
    });

    this.workoutForm.valueChanges
      .subscribe((data) => this.onValueChanged(this.workoutForm, data));

    const titleControl = this.workoutForm.get('title');
    titleControl.valueChanges.forEach(
      (value: string) => this.workout.title = value
    );
    const descriptionControl = this.workoutForm.get('description');
    descriptionControl.valueChanges.forEach(
      (value: string) => this.workout.description = value
    );
    const outfitControl = this.workoutForm.get('outfit');
    outfitControl.valueChanges.forEach(
      (value: string) => this.workout.description = value
    );
    const noticeControl = this.workoutForm.get('notice');
    noticeControl.valueChanges.forEach(
      (value: string) => this.workout.description = value
    );
    const addressControl = this.workoutForm.get('address');
    addressControl.valueChanges.forEach(
      (value: string) => this.workout.address = value
    );
    this.onValueChanged(this.workoutForm); // (re)set validation messages now
  }

  private isNumber(value: any): boolean {
    return !isNaN(this.toInteger(value));
  }

  private toInteger(value: any): number {
    return parseInt(`${value}`, 10);
  }

  get diagnostic() { return JSON.stringify(this.workout); }
  get diagnostic2() { return JSON.stringify(this.workoutForm.value); }
}
