import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers } from '@angular/http';
import { MatDialog, MatDialogRef } from '@angular/material';

import { BMReactFormComponent } from '../../../form/bm-react-form/bm-react-form.component';

import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Subject } from 'rxjs/Subject';

import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { CompleterService, RemoteData, CompleterData } from 'ng2-completer';

import { Coach } from '../../../models/index';

import { CoachService,
  ImageService } from '../../../_services/index';

@Component({
  selector: 'coach-form',
  templateUrl: './coach-form.component.html'
})

export class CoachFormComponent extends BMReactFormComponent implements OnInit {
  public formResult: any;
  public loading: boolean;
  public formReady: boolean = false;

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
        required: 'Ce champs est obligatoire',
    },
    lastname: {
        required: 'Ce champs est obligatoire',
    },
    description: {
        required: 'Ce champs est obligatoire',
    }
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private coachService: CoachService,
    private imageService: ImageService) {
    super();
    this.cropperSettings.rounded = true;
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

  public changePhoto(): void {
    this.coachPhotoPathBackup = this.coach.photo.path;
  }

  public resetPhoto(): void {
    this.coachPhotoPathBackup = '';
    this.cropperData = {};
  }

  public onSubmit(): void {
    this.loading = true;
    this.hideFormResult();

    let coach = this.createObjectFromModel();

    this.createNestedEntities(coach).then(
      (coachWithCreatedNestedEntities) => {
        return Promise.all([
          coachWithCreatedNestedEntities,
          this.createOrUpdate(this.coachService, coachWithCreatedNestedEntities)
        ]);
      })
      .then((resCoach) => {
        this.loading = false;
        this.showFormResult('success', 'Sauvegarde réussie');
        let coachId;
        if (resCoach[0].hasOwnProperty('id')) {
            coachId = resCoach[0].id;
        } else {
            coachId = resCoach[1].id;
        }
        this.router.navigate(['/partner/coach/' + coachId]);
      })
      .catch(this.handleError);
    //   this.showFormResult('error', 'Echec de la sauvegarde');
  }

  protected buildForm(): void {
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

  protected createNestedEntities(coach: Coach): Promise<Coach> {
    let Promises: any[] = new Array();
    if (!coach.photo.id && coach.photo.base64data !== null) {
      Promises.push(this.imageService.create(coach.photo).then((image) => coach.photo = image));
    } else if (coach.photo.base64data !== null) {
      Promises.push(this.imageService.update(coach.photo).then((image) => { coach.photo = image; this.resetPhoto(); }));
    }

    if (Promises.length > 0) {
      return Promise.all(Promises).then(() => {
        return coach;
      });
    } else {
      return Promise.resolve(coach);
    }
  }

  protected createObjectFromModel(): Coach {
    const form = this.coachForm;
    const formModel = this.coachForm.value;
    const coach = new Coach();

    if (this.coach.id) {
      coach.id = this.coach.id;
    }
    coach.business = this.coach.business;

    if (form.get('firstname').dirty) {
      coach.firstname = formModel.firstname;
    }
    if (form.get('lastname').dirty) {
      coach.lastname = formModel.lastname;
    }
    if (form.get('description').dirty) {
      coach.description = formModel.description;
    }

    if (this.cropperData.image) {
        coach.photo.base64data = this.cropperData.image;
    }

    return coach;
  }
}
