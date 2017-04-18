import { Component, OnInit, Input, ViewContainerRef }    from '@angular/core';
import { Headers } from '@angular/http';

import { Observable }           from "rxjs/Observable";
import { Subject }  from 'rxjs/Subject';

import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { ModalAddressForm  } from '../../modal/modal-address-form.component';
import { CompleterService, RemoteData, CompleterData } from 'ng2-completer';

import { Workout }  from '../../../models/workout';
import { Sport }    from '../../../models/sport';
import { Address }  from '../../../models/address';
import { Tag }      from '../../../models/tag';
import { Image }      from '../../../models/image';

import { SpaceService }     from '../../../_services/space.service';
import { SportService }     from '../../../_services/sport.service';
import { AddressService }   from '../../../_services/address.service';
import { TagService }       from '../../../_services/tag.service';
import { WorkoutService }       from '../../../_services/workout.service';

@Component({
  selector: 'workout-form',
  providers: [Modal],
  templateUrl: 'workout.component.html',
  styleUrls: ['workout.component.scss']
})

export class WorkoutFormComponent {
    loading = false;
    submitted = false;
    tagList: Tag[] = new Array();
    addresses: Address[];
    sports: Sport[];
    @Input()
    model: Workout;

    selectedStartDate: { year : 2017, month : 2, day : 1};
    selectedStartTime: { hour: 10, minute: 0, second: 0 };
    duration: number = 30;

    private SportsUrl = 'http://api.bemoove.local/sports';
    private sportDataService: RemoteData;

    private TagsUrl = 'http://api.bemoove.local/tags';
    private tagDataService: RemoteData;

    constructor(private workoutService: WorkoutService,
                private spaceService: SpaceService,
                private sportService: SportService,
                private addressService: AddressService,
                private tagService: TagService,
                private completerService: CompleterService,
                overlay: Overlay,
                vcRef: ViewContainerRef,
                public modal: Modal) {
                    overlay.defaultViewContainer = vcRef;

                    this.sportDataService = completerService.remote(this.SportsUrl+'?name=', 'name', 'name');
                    this.sportDataService.headers(new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'}));

                    this.tagDataService = completerService.remote(this.TagsUrl+'?name=', 'name', 'name');
                    this.tagDataService.headers(new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'}));
                }

    ngOnInit(): void {
        this.addressService.getAddressesByCoachId(this.spaceService.getUserId()).then(addresses => this.addresses = addresses);
        this.sportService.getAll().then(sports => this.sports = sports);
    }

    selectAddress(address: Address) {
        this.model.address = address;
    }

    selectSport(event) {
        if(event == null) {
            return;
        }
        if(event.originalObject == null && event.title != this.model.sport.name.trim()) {
            this.model.sport = new Sport();
            this.model.sport.name = event.title;
            return;
        }
        if(event.originalObject != null) {
            this.model.sport = event.originalObject;
            return;
        }
    }

    selectTag(event) {
        if(event == null || this.tagList.filter(t => t.name === event.title.trim()).length > 0) {
            return;
        }
        if(event.originalObject != null ) {
            this.tagList.push(event.originalObject);
            this.model.addedExistingTags.push(event.originalObject);
            return;
        }
        if(event.originalObject == null) {
            let newTag = new Tag();
            newTag.name = event.title.trim();
            this.tagList.push(newTag);
            this.model.addedNewTags.push(newTag);
            return;
        }
    }
    removeTag(tag: Tag) {
        this.model.tags = this.tagList.filter(t => t !== tag);
        if(tag.id) {
            this.model.addedExistingTags = this.model.addedExistingTags.filter(t => t !== tag);
        }
        else {
            this.model.addedNewTags = this.model.addedNewTags.filter(t => t.name !== tag.name);
        }
    }

    showModalAddressForm() {
        return this.modal.open(ModalAddressForm,
            overlayConfigFactory({ showClose: false, isBlocking: false}, BSModalContext)).then((resultPromise) => {
              return resultPromise.result.then((result) => {
                this.addresses.push(result);
                this.model.address = result;
            }, () => {console.log('Rejected!');});
            });
    }

    recalcMainModelDates() {
        let startDateIso = this.formatDate(this.selectedStartDate)+"T"+this.formatTime(this.selectedStartTime)+"+01:00";
        let startDate = new Date(startDateIso)
        this.model.startdate = startDate;
        this.model.enddate = new Date((startDate.getTime() + this.duration*60*1000));
    }

    addWorkout() {
        this.loading = true;
        let modelSave = this.model;
        this.workoutService.create(this.model)
                    .subscribe(
                        data => {
                            console.log(data);
                            this.loading = false;
                            this.model = data;
                        },
                        error => {
                            console.log(error);
                            this.loading = false;
                            this.model = modelSave;
                        });
    }

    refreshImage(data):void{
        this.model.photo = new Image();
        this.model.photo.base64data = "data:image/jpeg;base64,"+data;
      }

    onSubmit() { this.submitted = true; }

    private formatTime(time): string {
        return time ?
        `${this.isNumber(time.hour) ? this.padNumber(time.hour) : '00'}:${this.isNumber(time.minute) ? this.padNumber(time.minute) : '00'}:${this.isNumber(time.seconde) ? this.padNumber(time.seconde) : '00'}` :
        '00:00:00';
    }

    private formatDate(date): string {
        return date ?
            `${date.year}-${this.isNumber(date.month) ? this.padNumber(date.month) : ''}-${this.isNumber(date.day) ? this.padNumber(date.day) : ''}` :
            '';
    }

    private padNumber(value: number) {
      if (this.isNumber(value)) {
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
