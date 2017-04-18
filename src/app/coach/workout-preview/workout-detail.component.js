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
var common_1 = require('@angular/common');
var workout_1 = require('../models/workout');
var workout_service_1 = require('../workout-service/workout.service');
var WorkoutDetailComponent = (function () {
    function WorkoutDetailComponent(workoutService, route, location) {
        this.workoutService = workoutService;
        this.route = route;
        this.location = location;
    }
    WorkoutDetailComponent.prototype.ngOnInit = function () {
        // this.route.params
        //     .switchMap((params: Params) => this.trainingSessionService.getTrainingSession(+params['id']))
        //     .subscribe(trainingSession => this.trainingSession = trainingSession);
    };
    WorkoutDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', workout_1.Workout)
    ], WorkoutDetailComponent.prototype, "workout", void 0);
    WorkoutDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'workout-detail',
            templateUrl: 'workout-detail.component.html',
            styleUrls: ['workout-detail.component.css']
        }), 
        __metadata('design:paramtypes', [workout_service_1.WorkoutService, router_1.ActivatedRoute, common_1.Location])
    ], WorkoutDetailComponent);
    return WorkoutDetailComponent;
}());
exports.WorkoutDetailComponent = WorkoutDetailComponent;
//# sourceMappingURL=workout-detail.component.js.map