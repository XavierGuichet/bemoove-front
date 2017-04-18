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
var router_1 = require('@angular/router');
var angular2_modal_1 = require('angular2-modal');
var bootstrap_1 = require('angular2-modal/plugins/bootstrap');
var sporty_subscribe_modal_1 = require('../../modal/sporty-subscribe/sporty-subscribe-modal');
var WelcomeSearchComponent = (function () {
    function WelcomeSearchComponent(overlay, vcRef, modal, router) {
        this.modal = modal;
        this.router = router;
        overlay.defaultViewContainer = vcRef;
    }
    WelcomeSearchComponent.prototype.ngOnInit = function () {
    };
    WelcomeSearchComponent.prototype.showJoinUs = function () {
        return this.modal.open(sporty_subscribe_modal_1.SportySubscribeModal, angular2_modal_1.overlayConfigFactory({ num1: 2, num2: 3 }, bootstrap_1.BSModalContext));
    };
    WelcomeSearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'welcome-search',
            providers: [bootstrap_1.Modal],
            templateUrl: 'search.component.html',
            styleUrls: ['search.component.css']
        }), 
        __metadata('design:paramtypes', [angular2_modal_1.Overlay, core_1.ViewContainerRef, bootstrap_1.Modal, router_1.Router])
    ], WelcomeSearchComponent);
    return WelcomeSearchComponent;
}());
exports.WelcomeSearchComponent = WelcomeSearchComponent;
//# sourceMappingURL=search.component.js.map