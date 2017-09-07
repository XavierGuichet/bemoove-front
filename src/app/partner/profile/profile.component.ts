import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

import { SpaceService } from '../../_services/space.service';
import { ImageService } from '../../_services/image.service';
import { ProfileService } from '../../_services/profile.service';

import { Image } from '../../models/image';
import { Profile } from '../../models/profile';

@Component({
  selector: 'organization-informations',
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  public loading = false;
  public profile: Profile;
  public profileForm: FormGroup;
  public cropperData: any;
  public cropperSettings: CropperSettings;

  @ViewChild('cropper', undefined) public cropper: ImageCropperComponent;

  public formErrors = {
    legalName: '',
    siret: '',
    vatNumber: '',
  };

  public validationMessages = {
    legalName: {
      required: 'Veuillez indiquer le nom de votre société',
    },
    siret: {

    },
    vatNumber: {

    }
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService,
    private imageService: ImageService,
    private spaceService: SpaceService) {
        this.cropperSettings = new CropperSettings();
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
    this.profileService.getByOwnerId(this.spaceService.getUserId()).then((Profile) => {
        this.profile = Profile[0];
        if(this.profile.photo == null) {
            this.profile.photo = new Image();
        }
        this.buildForm();
    });
  }

  public onSubmit(): void {
      this.loading = true;
      //
      this.createRelatedNewEntities().subscribe( () => {
      const form = this.profileForm;
      const formModel = this.profileForm.value;
      let limitedProfile = new Profile();
      //
      if (this.profile.id) {
        limitedProfile.id = this.profile.id;
      }
      if (form.get('firstname').dirty) {
        limitedProfile.firstname = formModel.firstname;
      }
      if (form.get('lastname').dirty) {
        limitedProfile.lastname = formModel.lastname;
      }
      if (form.get('presentation').dirty) {
        limitedProfile.presentation = formModel.presentation;
      }
      limitedProfile.photo = this.profile.photo;

      this.profileService.update( limitedProfile )
                                 .subscribe((profile) => {
                                     this.profile = profile;
                                     this.loading = false;
                                 });
                             });
  }

  public createRelatedNewEntities() {
    let ObservableOfCreation: any[] = new Array();

    if (!this.profile.photo.id) {
      ObservableOfCreation.push(this.imageService.create(this.profile.photo).map( (image) => this.profile.photo = image));
    }

    if (!this.profile.photo.id) {
      return Observable.forkJoin(ObservableOfCreation).map( () => true);
    } else {
      return Observable.empty();
    }
  }

  public setProfileImageData() {
    this.profile.photo.base64data = this.cropperData.image;
  }

  private buildForm(): void {
      this.profileForm = this.fb.group({
        firstname: [this.profile.firstname, [
          Validators.required
        ]
        ],
        lastname: [this.profile.lastname, [
          Validators.required
        ]
        ],
        presentation: [this.profile.presentation, [
          Validators.required
        ]
        ],
      });
      //
      this.profileForm.valueChanges
        .subscribe((data) => this.onValueChanged(this.profileForm, data));

      // (re)set validation messages.
      this.onValueChanged(this.profileForm);
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
