import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers } from '@angular/http';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Subject } from 'rxjs/Subject';

import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { CompleterService, RemoteData, CompleterData } from 'ng2-completer';

import { Coach } from '../../../models/index';

import { CoachService,
  ImageService,
  SpaceService } from '../../../_services/index';

@Component({
  selector: 'coach-form',
  templateUrl: './coach-form.component.html',
  styleUrls: ['./coach-form.component.scss']
})

export class CoachFormComponent implements OnInit {
  public formResult: any;
  public loading = false;
  @Input()
  public coach: Coach;
  public coachForm: FormGroup;
  public coachPhotoPathBackup: string = '';
  public cropperData: any;
  public cropperSettings: CropperSettings = new CropperSettings();

  @ViewChild('cropper', undefined) public cropper: ImageCropperComponent;

  public formErrors = {
    firstname: '',
    lastname: '',
    description: '',
  };

  public validationMessages = {
    firstname: {
    },
    lastname: {
    },
    description: {
    }
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private coachService: CoachService,
    private imageService: ImageService,
    private spaceService: SpaceService) {
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 400;
    this.cropperSettings.croppedHeight = 400;
    this.cropperSettings.canvasWidth = 175;
    this.cropperSettings.canvasHeight = 175;
    this.cropperSettings.keepAspect = true;

    this.cropperData = {};
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public setCoachImageData() {
    this.coach.photo.base64data = this.cropperData.image;
    this.cropperSettings.canvasWidth = 175;
    this.cropperSettings.canvasHeight = 175;
  }

  public changePhoto(): void {
    this.coachPhotoPathBackup = this.coach.photo.path;
  }

  public resetPhoto(): void {
    this.coachPhotoPathBackup = '';
  }

  public onSubmit(): void {
    this.createRelatedNewEntities().subscribe(() => {
      let submittedEntity = this.prepareSubmittedEntity();
      this.loading = true;
      this.hideFormResult();
      if (!this.coach.id) {
        this.coachService.create(submittedEntity)
          .subscribe(
          (data) => {
            this.coach = data;
            this.showFormResult('success', 'Sauvegarde réussie');
            this.router.navigate(['/partner/coach/'+this.coach.id]);
            this.loading = false;
          },
          (error) => {
            this.showFormResult('error', 'Echec de la sauvegarde');
            this.loading = false;
          });
      } else {
        this.coachService.update(submittedEntity)
          .subscribe(
          (data) => {
            this.showFormResult('success', 'Sauvegarde réussie');
            this.loading = false;
          },
          (error) => {
            this.showFormResult('error', 'Echec de la sauvegarde');
            this.loading = false;
          });
      }
    }
    );
  }

  private prepareSubmittedEntity() {
    const form = this.coachForm;
    const formModel = this.coachForm.value;
    let limitedCoach = new Coach();

    if (this.coach.id) {
      limitedCoach.id = this.coach.id;
    }
    if (form.get('firstname').dirty) {
      limitedCoach.firstname = formModel.firstname;
    }
    if (form.get('lastname').dirty) {
      limitedCoach.lastname = formModel.lastname;
    }
    if (form.get('description').dirty) {
      limitedCoach.description = formModel.description;
    }
    limitedCoach.business = this.coach.business;
    limitedCoach.photo = this.coach.photo;

    return limitedCoach;
  }

  private createRelatedNewEntities() {
    let ObservableOfCreation: any[] = new Array();

    if (!this.coach.photo.id && this.coach.photo.base64data !== null) {
      ObservableOfCreation.push(this.imageService.create(this.coach.photo).map((image) => this.coach.photo = image));
  } else if (this.coach.photo.base64data !== null) {
      ObservableOfCreation.push(this.imageService.update(this.coach.photo).map((image) => { this.coach.photo = image; this.resetPhoto(); }));
    }

    if (ObservableOfCreation.length === 0) {
        ObservableOfCreation.push(Observable.of(''));
    }
    return Observable.forkJoin(ObservableOfCreation).map(() => true);
  }

  private buildForm(): void {
    this.coachForm = this.fb.group({
      firstname: [this.coach.firstname, [
        Validators.required
      ]
      ],
      lastname: [this.coach.lastname, [
        Validators.required
      ]
      ],
      description: [this.coach.description, [
        Validators.required
      ]
      ],
    });
    //
    this.coachForm.valueChanges
      .subscribe((data) => this.onValueChanged(this.coachForm, data));

    // (re)set validation messages.
    this.onValueChanged(this.coachForm);
  }

  private hideFormResult() {
      this.formResult = false;
  }

  private showFormResult(type: string, title: string, content: string = '') {
      this.formResult = { type, title, content};
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
