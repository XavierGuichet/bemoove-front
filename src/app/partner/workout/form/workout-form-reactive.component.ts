import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Headers } from '@angular/http';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { CompleterService, RemoteData, CompleterData } from 'ng2-completer';

import { ModalAddressFormComponent  } from '../../modal/modal-address-form.component';

import { Workout } from '../../../models/workout';
import { Sport } from '../../../models/sport';
import { Address } from '../../../models/address';
import { Tag } from '../../../models/tag';
import { Image } from '../../../models/image';

import { SpaceService } from '../../../_services/space.service';
import { SportService } from '../../../_services/sport.service';
import { ImageService } from '../../../_services/image.service';
import { AddressService } from '../../../_services/address.service';
import { TagService } from '../../../_services/tag.service';
import { WorkoutService } from '../../../_services/workout.service';

@Component({
  selector: 'workout-form-reactive',
  templateUrl: './workout-form-reactive.component.html',
  styleUrls: ['./workout-form-reactive.component.scss']
})

export class WorkoutFormReactiveComponent implements OnInit {
  public loading = false;
  public valid = false; // TODO unused ?

  public workoutForm: FormGroup;
  public submitted = false;

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
    tag: '',
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
    },
  };

  @Input()
  public workout: Workout;

  public now = new Date();
  public partnerAddresses: Address[] = new Array();
  public sports: Sport[];

  public ngbTomorrow: { year: number, month: number, day: number };
  public selectedStartDate: { year: number, month: number, day: number };
  public selectedStartTime: { hour: number, minute: number, second: number };
  public duration: { hour: number, minute: number, second: number };

  public sportDataService: RemoteData;
  public tagDataService: RemoteData;

  public cropperData: any;
  public cropperSettings: CropperSettings;

  public selectedTab;

  @ViewChild('cropper', undefined) public cropper: ImageCropperComponent;

  private SportsUrl = 'http://' + process.env.API_URL + '/sports';

  private TagsUrl = 'http://' + process.env.API_URL + '/tags';

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService,
    private spaceService: SpaceService,
    private sportService: SportService,
    private addressService: AddressService,
    private imageService: ImageService,
    private tagService: TagService,
    private completerService: CompleterService,
    public dialog: MdDialog) {
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

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 160;
    this.cropperSettings.height = 90;
    this.cropperSettings.croppedWidth = 720;
    this.cropperSettings.croppedHeight = 405;
    this.cropperSettings.canvasWidth = 600;
    this.cropperSettings.canvasHeight = 337;
    this.cropperSettings.keepAspect = true;

    this.cropperData = {};
  }

  public ngOnInit(): void {
    this.buildForm();

    this.addressService.getAddressesByPartnerId(this.spaceService.getUserId())
      .then((addresses) => {
        if (addresses.length > 0) {
          this.partnerAddresses = addresses;
          this.workoutForm.patchValue({ address: this.partnerAddresses[0] });
        }
      });
      this.setStartDate();
    this.sportService.getAll().then((sports) => this.sports = sports);
    let tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    this.ngbTomorrow = {
      year: tomorrow.getFullYear(),
      month: tomorrow.getMonth() + 1,
      day: tomorrow.getDate()
    };
  }

  public changeTab(index: integer): void {
      this.selectedTab = index;
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
    if (event == null
      || event.title.trim().length === 0 ||
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
    dialogRef.afterClosed().subscribe((resultPromise) => {
      this.partnerAddresses.unshift(resultPromise);
      this.workout.address = resultPromise;
      this.workoutForm.patchValue({
        address: this.workout.address
      });
    });
  }

  public forceIntegerPrice() {
    this.workout.price = this.toInteger(this.workout.price);
    if (!this.isNumber(this.workout.price) || this.workout.price < 7) {
      this.workout.price = 7;
    }
  }

  public forceIntegerNbTicket() {
    this.workout.nbTicketAvailable = this.toInteger(this.workout.nbTicketAvailable);
    if (!this.isNumber(this.workout.nbTicketAvailable)) {
      this.workout.nbTicketAvailable = 1;
    }
  }

  public setStartDate() {
    if (this.workout.startdate) {
      this.selectedStartDate = {
        year: this.workout.startdate.getFullYear(),
        month: this.workout.startdate.getMonth() + 1,
        day: this.workout.startdate.getDate()
      };
      this.selectedStartTime = {
        hour: this.workout.startdate.getHours(),
        minute: this.workout.startdate.getMinutes(),
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
    if (this.workout.duration) {
      this.duration = {
        hour: Math.ceil(parseInt(this.workout.duration, 10) / 60),
        minute: parseInt(this.workout.duration, 10) % 60,
        second: 0
      };
    } else {
      this.duration = {
        hour: 1,
        minute: 0,
        second: 0
      };
    }
    this.recalcMainworkoutDates();
  }

  public recalcMainworkoutDates() {
    this.workout.startdate = new Date(this.selectedStartDate.year,
      this.selectedStartDate.month - 1,
      this.selectedStartDate.day,
      this.selectedStartTime.hour,
      this.selectedStartTime.minute,
      this.selectedStartTime.second);
    this.workout.enddate = new Date(this.workout.startdate.getTime() + (this.duration.hour * 60 + this.duration.minute) * 60 * 1000);
  }

  public createRelatedNewEntities() {
    let ObservableOfCreation: any[] = new Array();

    if (!this.workout.photo.id) {
      ObservableOfCreation.push(this.imageService.create(this.workout.photo).map( (image) => this.workout.photo = image));
    }

    if (!this.workout.sport.id) {
      ObservableOfCreation.push(this.sportService.create(this.workout.sport).map( (sport) => this.workout.sport = sport));
    }

    if (!this.workout.photo.id || !this.workout.sport.id) {
      return Observable.forkJoin(ObservableOfCreation).map( () => true);
    } else {
      return Observable.empty();
    }
  }

  public onSubmit() {
    this.createRelatedNewEntities().subscribe( () => {
      let saveWorkout = this.prepareSaveWorkout();
      this.submitted = true;
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
    saveWorkout.startdate = this.workout.startdate;
    saveWorkout.enddate = this.workout.enddate;

    saveWorkout.title = formModel.title;
    saveWorkout.sport = this.workout.sport;

    saveWorkout.address = formModel.address;
    saveWorkout.price = this.workout.price;
    saveWorkout.nbTicketAvailable = this.workout.nbTicketAvailable;

    saveWorkout.photo = this.workout.photo;
    saveWorkout.description = formModel.description;
    saveWorkout.outfit = formModel.outfit;
    saveWorkout.notice = formModel.notice;
    saveWorkout.tags = this.workout.tags;
    return saveWorkout;
  }

  public onValueChanged(data?: any) {
    if (!this.workoutForm) { return; }
    const form = this.workoutForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  private buildForm(): void {
    this.workoutForm = this.fb.group({
      startdate: [this.selectedStartDate, [
        Validators.required,
      ]
      ],
      starttime: [this.selectedStartTime, [
        Validators.required,
      ]
      ],
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
      ]
      ],
      price: [this.workout.price, [
        Validators.required,
      ]
      ],
      nbTicketAvailable: [this.workout.nbTicketAvailable, [
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
      .subscribe((data) => this.onValueChanged(data));

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

    const durationControl = this.workoutForm.get('duration');
    durationControl.valueChanges.forEach(
      (value: string) => this.recalcMainworkoutDates()
    );

    const startdateControl = this.workoutForm.get('startdate');
    startdateControl.valueChanges.forEach(
      (value: string) => this.recalcMainworkoutDates()
    );
    const starttimeControl = this.workoutForm.get('starttime');
    starttimeControl.valueChanges.forEach(
      (value: string) => this.recalcMainworkoutDates()
    );
    const addressControl = this.workoutForm.get('address');
    addressControl.valueChanges.forEach(
      (value: string) => this.workout.address = value
    );
    this.onValueChanged(); // (re)set validation messages now
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
