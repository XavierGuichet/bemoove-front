"use strict";
var Workout = (function () {
    function Workout(id, title, sport) {
        this.id = id;
        this.title = title;
        this.sport = sport;
        this.price = 0;
        this.nbTicketAvaible = 0;
    }
    return Workout;
}());
exports.Workout = Workout;
//# sourceMappingURL=workout.js.map