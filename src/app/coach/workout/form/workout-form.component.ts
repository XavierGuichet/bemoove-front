import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
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
  selector: 'workout-form',
  templateUrl: 'workout-form.component.html',
  styleUrls: ['workout-form.component.scss']
})

export class WorkoutFormComponent implements OnInit {
    public tagList: Tag[] = new Array();
    public addresses: Address[];
    public sports: Sport[];
    @Input()
    public model: Workout;

    public selectedStartDate: { year: 2017, month: 2, day: 1};
    public selectedStartTime: { hour: 10, minute: 0, second: 0 };
    public duration: any = {hour: 1, minute: 0};

    public sportDataService: RemoteData;
    public tagDataService: RemoteData;

    public cropperData: any;
    public cropperSettings: CropperSettings;

    @ViewChild('cropper', undefined) cropper:ImageCropperComponent;

    private loading = false;
    private submitted = false;

    private SportsUrl = 'http://api.bemoove.local/sports';

    private TagsUrl = 'http://api.bemoove.local/tags';

    constructor(private workoutService: WorkoutService,
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
                                            'Accept': 'application/json'}));

                    this.tagDataService = completerService.remote(
                                        this.TagsUrl + '?name=',
                                        'name',
                                        'name');
                    this.tagDataService.headers(new Headers({
                                            'Content-Type': 'application/json',
                                            'Accept': 'application/json'}));


                    this.cropperSettings = new CropperSettings();
                      this.cropperSettings.width = 160;
                      this.cropperSettings.height = 90;
                      this.cropperSettings.croppedWidth =160;
                      this.cropperSettings.croppedHeight = 90;
                      this.cropperSettings.canvasWidth = 400;
                      this.cropperSettings.canvasHeight = 300;
                      this.cropperSettings.keepAspect = true;

                      this.cropperData = {};
                }

    public ngOnInit(): void {
        this.addressService.getAddressesByCoachId(this.spaceService.getUserId())
                            .then((addresses) => this.addresses = addresses);
        this.sportService.getAll().then((sports) => this.sports = sports);
    }

    public selectAddress(address: Address) {
        this.model.address = address;
    }

    public selectSport(event) {
        if (event == null) {
            return;
        }
        if (event.originalObject == null && event.title !== this.model.sport.name.trim()) {
            this.model.sport = new Sport();
            this.model.sport.name = event.title;
            return;
        }
        if (event.originalObject != null) {
            this.model.sport = event.originalObject;
            return;
        }
    }

    public selectTag(event) {
        if (event == null || this.tagList.filter((t) => t.name === event.title.trim()).length > 0) {
            return;
        }
        if (event.originalObject != null ) {
            this.tagList.push(event.originalObject);
            this.model.addedExistingTags.push(event.originalObject);
            return;
        }
        if (event.originalObject == null) {
            let newTag = new Tag();
            newTag.name = event.title.trim();
            this.tagList.push(newTag);
            this.model.addedNewTags.push(newTag);
            return;
        }
    }
    public removeTag(tag: Tag) {
        this.model.tags = this.tagList.filter((t) => t !== tag);
        if (tag.id) {
            this.model.addedExistingTags = this.model.addedExistingTags.filter(
                                                    (t) => t !== tag);
        } else {
            this.model.addedNewTags = this.model.addedNewTags.filter(
                                                    (t) => t.name !== tag.name);
        }
    }

    public showModalAddressFormComponent() {
        let dialogRef = this.dialog.open(ModalAddressFormComponent);
        dialogRef.afterClosed().subscribe((resultPromise) => {
          return resultPromise.result.then((result) => {
            this.addresses.push(result);
            this.model.address = result;
        }, () => { console.log('Rejected!'); });
        });
    }

    public recalcMainModelDates() {
        let startDateIso =  this.formatDate(this.selectedStartDate) + 'T' +
                            this.formatTime(this.selectedStartTime) + '+01:00';
        let startDate = new Date(startDateIso);
        console.log(startDate);
        this.model.startdate = startDate;
        this.model.enddate = new Date((startDate.getTime() + this.duration.hour * 60 * 1000 + this.duration.minute * 1000));
    }

    public addWorkout() {
        this.loading = true;
        let modelSave = this.model;
        this.workoutService.create(this.model)
                    .subscribe(
                        (data) => {
                            this.loading = false;
                            this.model = data;
                        },
                        (error) => {
                            this.loading = false;
                            this.model = modelSave;
                        });
    }

    public refreshImage(data): void {
        this.model.photo = new Image();
        this.model.photo.base64data = 'data:image/jpeg;base64,' + data;
        this.imageService.create(this.model.photo)
                    .subscribe(
                        (data) => {
                            console.log(data);
                            this.loading = false;
                            // this.model = data;
                        },
                        (error) => {
                            this.loading = false;
                            // this.model = modelSave;
                        });
      }

    public onSubmit() { this.submitted = true; }

    private formatTime(time): string {
        if (time) {
            let hour;
            let minute;
            let seconde;
            hour = this.isNumber(time.hour) ? this.padNumber(time.hour) : '00';
            minute = this.isNumber(time.minute) ? this.padNumber(time.minute) : '00';
            seconde = this.isNumber(time.seconde) ? this.padNumber(time.seconde) : '00';
            return hour + ':' + minute + ':' + seconde;
        } else {
            return '00:00:00';
        }
    }

    private formatDate(date): string {
        if (date) {
            let month = this.isNumber(date.month) ? this.padNumber(date.month) : '';
            let day = this.isNumber(date.day) ? this.padNumber(date.day) : '';
            return `${date.year}-${month}-${day}`;
        } else {
            return '';
        }
    }

    private padNumber(value: number) {
      if ( this.isNumber(value) ) {
        return `0${value}`.slice(-2);
      } else {
        return '';
      }
    }

    private isNumber(value: any): boolean {
      return !isNaN(this.toInteger(value));
    }

    private toInteger(value: any): number {
      return parseInt(`${value}`, 10);
    }
}
