import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Headers } from '@angular/http';
import { MatDialog, MatDialogRef } from '@angular/material';

import { BMReactFormComponent } from '../../../form/bm-react-form/bm-react-form.component';
import { BMImageInputComponent } from '../../../../form/bm-image-input/bm-image-input.component';

import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Subject } from 'rxjs/Subject';

// import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { CompleterService, RemoteData, CompleterData } from 'ng2-completer';

import { BMImage, Coach } from '../../../models/index';

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

  public formErrors = {
    firstname: '',
    lastname: '',
    description: '',
    photo: ''
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
    },
    photo: {

    }
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private coachService: CoachService,
    private imageService: ImageService) {
    super();
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  get photoCoachControl() {
    return this.coachForm.get('photo');
  }

  public confirmPhotoCoach(image: BMImage) {
    this.photoCoachControl.setValue(image);
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
      photo: [this.coach.photo, [

      ]]
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
      Promises.push(this.imageService.update(coach.photo).then((image) => { coach.photo = image; }));
    }

    if (Promises.length > 0) {
      return Promise.all(Promises).then(() => coach);
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
    coach.photo = formModel.photo;

    return coach;
  }
}
