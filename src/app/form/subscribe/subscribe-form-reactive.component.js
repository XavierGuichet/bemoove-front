"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var user_1 = require('../../models/user');
var regexp_directive_1 = require('../../shared/regexp.directive');
var SubscribeFormReactiveComponent = (function () {
    function SubscribeFormReactiveComponent(fb) {
        this.fb = fb;
        this.user = new user_1.User();
        this.sports = ['Art Martiaux', 'Détente / Bien être', 'Danse', 'Musculation', 'Remise en forme', 'Sports aquatique', 'Sports collectif', 'Sports de combat', 'Sport d\'opposition', 'Sports nautique', 'Sport de raquette'];
        this.submitted = false;
        // Reset the form with a new user AND restore 'pristine' class state
        // by toggling 'active' flag which causes the form
        // to be removed/re-added in a tick via NgIf
        // TODO: Workaround until NgForm has a reset method (#6822)
        this.active = true;
        this.formErrors = {
            'email': '',
            'passwords': '',
            'password': '',
            'repeat': '',
            'cartepronum': ''
        };
        this.validationMessages = {
            'email': {
                'required': 'Name is required.',
                'regexpvalidatorphrase': 'This must be a valid email.'
            },
            'password': {
                'required': 'Password is required.',
                'minlength': 'Password must be at least 8 characters long.',
                'maxlength': 'Password cannot be more than 36 characters long.',
                'regexpvalidatorphrase': 'Use a complex password'
            },
            'repeat': {
                'areEqual': 'Password repetition is required.',
            },
            'passwords': {
                'areEqual': 'Passwords are different.',
            },
            'cartepronum': {
                'isValidCartePro': 'You must enter your professionnal license or indicate that your activity doesn\'t need one',
            }
        };
    }
    SubscribeFormReactiveComponent.prototype.onSubmit = function () {
        this.submitted = true;
        this.user = this.subscribeForm.value;
    };
    Object.defineProperty(SubscribeFormReactiveComponent.prototype, "diagnostic", {
        get: function () { return JSON.stringify(this.user); },
        enumerable: true,
        configurable: true
    });
    SubscribeFormReactiveComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    SubscribeFormReactiveComponent.prototype.buildForm = function () {
        var _this = this;
        this.subscribeForm = this.fb.group({
            'email': [this.user.email, [
                    forms_1.Validators.required,
                    regexp_directive_1.RegexpValidator(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i)
                ]
            ],
            'nom': ['', [
                    forms_1.Validators.required
                ]
            ],
            'prenom': ['', [
                    forms_1.Validators.required
                ]
            ],
            'passwords': this.fb.group({
                password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(8),
                        forms_1.Validators.maxLength(36),
                        regexp_directive_1.RegexpValidator(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/)]],
                repeat: ['', [forms_1.Validators.required]]
            }, { validator: this.areEqual }),
            'sports': ['', [forms_1.Validators.required]],
            'cartepronum': ['', [this.isValidCartePro]],
            'cartepronotneeded': ['']
        });
        this.subscribeForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(); // (re)set validation messages now
    };
    SubscribeFormReactiveComponent.prototype.toggleCartePro = function () {
        var form = this.subscribeForm;
        var disabled = form.get('cartepronotneeded').value;
        form.get('cartepronum').reset({ value: '', disabled: !disabled });
    };
    SubscribeFormReactiveComponent.prototype.isValidCartePro = function (control) {
        var valid = false;
        if (!control.disabled) {
            valid = true;
        }
        var regexp = new RegExp(/^([0-9]{4,5})([A-Z]{1,3})([0-9]{4,5})$/i);
        var numcartepro = control.value;
        valid = regexp.test(numcartepro);
        console.log("isvalidcartePRO");
        console.log(valid);
        return valid ? null : { 'isValidCartePro': { numcartepro: numcartepro } };
    };
    SubscribeFormReactiveComponent.prototype.areEqual = function (group) {
        var valid = false;
        var lastSeenValue = false;
        for (var name_1 in group.controls) {
            var val = group.controls[name_1].value;
            if (lastSeenValue == false) {
                lastSeenValue = val;
            }
            if (lastSeenValue == val) {
                lastSeenValue = val;
                valid = true;
            }
            else {
                valid = false;
                break;
            }
        }
        return valid ? null : { 'areEqual': { val: val } };
    };
    SubscribeFormReactiveComponent.prototype.onValueChanged = function (data) {
        if (!this.subscribeForm) {
            return;
        }
        var form = this.subscribeForm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
            var subcontrol = form.controls['passwords'].get(field);
            if (subcontrol && subcontrol.dirty && !subcontrol.valid) {
                var messages = this.validationMessages[field];
                for (var key in subcontrol.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    SubscribeFormReactiveComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'subscribe-form-reactive',
            templateUrl: 'subscribe-form-reactive.component.html',
            styleUrls: ['subscribe-form-reactive.component.css']
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], SubscribeFormReactiveComponent);
    return SubscribeFormReactiveComponent;
}());
exports.SubscribeFormReactiveComponent = SubscribeFormReactiveComponent;
//# sourceMappingURL=subscribe-form-reactive.component.js.map