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
function RegexpValidator(nameRe) {
    return function (control) {
        var name = control.value;
        var no = nameRe.test(name);
        return no ? null : { 'regexpvalidatorphrase': { name: name } };
    };
}
exports.RegexpValidator = RegexpValidator;
var RegexpValidatorDirective = (function () {
    function RegexpValidatorDirective() {
        this.valFn = forms_1.Validators.nullValidator;
    }
    RegexpValidatorDirective.prototype.ngOnChanges = function (changes) {
        var change = changes['phrase'];
        if (change) {
            var val = change.currentValue;
            var re = val instanceof RegExp ? val : new RegExp(val, 'i');
            this.valFn = RegexpValidator(re);
        }
        else {
            this.valFn = forms_1.Validators.nullValidator;
        }
    };
    RegexpValidatorDirective.prototype.validate = function (control) {
        return this.valFn(control);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RegexpValidatorDirective.prototype, "phrase", void 0);
    RegexpValidatorDirective = __decorate([
        core_1.Directive({
            selector: '[Regexp]',
            providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: RegexpValidatorDirective, multi: true }]
        }), 
        __metadata('design:paramtypes', [])
    ], RegexpValidatorDirective);
    return RegexpValidatorDirective;
}());
exports.RegexpValidatorDirective = RegexpValidatorDirective;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
//# sourceMappingURL=regexp.directive.js.map