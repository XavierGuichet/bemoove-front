"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var angular2_modal_1 = require('angular2-modal');
var bootstrap_1 = require('angular2-modal/plugins/bootstrap');
var SportySubscribeModalContext = (function (_super) {
    __extends(SportySubscribeModalContext, _super);
    function SportySubscribeModalContext() {
        _super.apply(this, arguments);
    }
    return SportySubscribeModalContext;
}(bootstrap_1.BSModalContext));
exports.SportySubscribeModalContext = SportySubscribeModalContext;
/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
var SportySubscribeModal = (function () {
    function SportySubscribeModal(dialog) {
        this.dialog = dialog;
        this.context = dialog.context;
        this.wrongAnswer = true;
        dialog.setCloseGuard(this);
    }
    SportySubscribeModal.prototype.onKeyUp = function (value) {
        this.wrongAnswer = value != 5;
        this.dialog.close();
    };
    SportySubscribeModal.prototype.beforeDismiss = function () {
        return true;
    };
    SportySubscribeModal.prototype.beforeClose = function () {
        return this.wrongAnswer;
    };
    SportySubscribeModal = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'modal-content',
            templateUrl: 'sporty-subscribe-modal.component.html',
            styleUrls: ['sporty-subscribe-modal.component.css']
        }), 
        __metadata('design:paramtypes', [angular2_modal_1.DialogRef])
    ], SportySubscribeModal);
    return SportySubscribeModal;
}());
exports.SportySubscribeModal = SportySubscribeModal;
//# sourceMappingURL=sporty-subscribe-modal.js.map