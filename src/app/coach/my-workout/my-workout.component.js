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
var workout_service_1 = require('../../workout-service/workout.service');
var CoachMyWorkoutComponent = (function () {
    function CoachMyWorkoutComponent(router, workoutService) {
        this.router = router;
        this.workoutService = workoutService;
    }
    CoachMyWorkoutComponent.prototype.ngOnInit = function () {
        this.getCommingWorkoutByCoachId(1);
        this.getPastWorkoutByCoachId(1);
    };
    CoachMyWorkoutComponent.prototype.getCommingWorkoutByCoachId = function (id) {
        var _this = this;
        this.workoutService.getCommingWorkoutByCoachId(id)
            .then(function (workouts) { return _this.commingWorkouts = workouts; });
    };
    CoachMyWorkoutComponent.prototype.getPastWorkoutByCoachId = function (id) {
        var _this = this;
        this.workoutService.getPastWorkoutByCoachId(id)
            .then(function (workouts) { return _this.pastWorkouts = workouts; });
    };
    CoachMyWorkoutComponent.prototype.delete = function (workout) {
        var _this = this;
        this.workoutService
            .delete(workout.id)
            .then(function () {
            _this.commingWorkouts = _this.commingWorkouts.filter(function (w) { return w !== workout; });
            _this.pastWorkouts = _this.pastWorkouts.filter(function (w) { return w !== workout; });
            // if (this.selectedHero === hero) { this.selectedHero = null; }
        });
    };
    CoachMyWorkoutComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'coach-my-workout',
            providers: [workout_service_1.WorkoutService],
            templateUrl: 'my-workout.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, workout_service_1.WorkoutService])
    ], CoachMyWorkoutComponent);
    return CoachMyWorkoutComponent;
}());
exports.CoachMyWorkoutComponent = CoachMyWorkoutComponent;
//# sourceMappingURL=my-workout.component.js.map