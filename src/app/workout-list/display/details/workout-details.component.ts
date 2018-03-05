import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ScrollToAnimationEasing, ScrollToEvent, ScrollToOffsetMap } from '@nicky-lenaers/ngx-scroll-to';

import {
    DomSanitizer,
    SafeHtml,
    SafeUrl,
    SafeStyle
} from '@angular/platform-browser';

import {
    Cart,
    Coach,
    Workout,
    WorkoutInstance } from '../../../models/index';

import {
    CartService,
    ProfileService,
    WorkoutService,
    WorkoutInstanceService } from '../../../_services/index';

@Component({
  selector: 'workout-details',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './workout-details.component.html',
  styleUrls: [ './workout-details.component.scss' ]
})

export class WorkoutDetailsComponent implements OnInit {
    public workout: Workout;
    public coach: Coach;
    public workoutInstances: WorkoutInstance[];
    public scrolled: boolean = false;
    public headerimage: any;
    private cart: Cart;
    constructor(
        private domSanitizer: DomSanitizer,
        private cartService: CartService,
        private workoutService: WorkoutService,
        private workoutInstanceService: WorkoutInstanceService,
        private profileService: ProfileService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        // TODO
    }

    public ngOnInit(): void {
        this.route.params
          .switchMap( (params: Params) => {
              return this.workoutService.getWorkout(+params['idworkout']);
          })
          .subscribe( (workout) => {
              this.workout = workout;
              this.headerimage =  this.domSanitizer.bypassSecurityTrustStyle(`url(${this.workout.photoWide.path})`);
              this.workoutInstanceService.getBookableByWorkoutId(this.workout.id).then( (workoutInstances) => {
                  this.workoutInstances = workoutInstances;
                  console.log(this.workoutInstances);
                  if (this.workoutInstances[0].coach) {
                      this.coach = this.workoutInstances[0].coach;
                  }
              });
          });
    }

    /**
     * Ce serait bien de créer le compte mangopay des coachs à un moment
     * Coach + mangopay + local et/ou test = comment ca se passe ?
     */

    /*
    Au changement de workoutInstances
    - modifie le prix affiché
    - modifie le nombre place max reservable

    Au clic sur le reservation
    - Verifie que la personne est connecté
    -- Non : fin a ce stade et affiche la popup de connexion sur la page en cours

    Envoie une requete de préreservation / lock au serveur pour le nombre de place indiqué
    - Si reponse n'est pas ok.
    -- Il n'y a plus aucune place / Ce cours n'existe pas :
    --- Affiche un message : IL ne reste malheuresement plus de places disponible pour ce cours.
    -- Il n'y a pas assez de places disponible pour répondre à la demande
    --- Affiche : Le nombre de place disponible a changé. Nous ne pouvons pas vous proposer X places. Mais vous pouvez déjà y aller à Y personnes.
    - La requete de préreservation ajoute un token/ ligne de lock dans l'api et comme preuve de la validité, renvoie un token pour effectuer la réreservation. (A chaque fois qu'un utilisateur passe en préreservation d'un cours, toute ses préreservation précédentes deviennent caduques.)

    Sinon, envoie sur la page de reservation
    Celle ci affiche un formulaire de reservation pour Une séance de 1 à X personne prédéfini à l'avance

    https://docs.mangopay.com/guide/marketplace
    La commande se passe ainsi:
    -> Verifier que le compte MangoPay de l'utilisateurs existe
    --> Au besoin crée celui-ci
    -> Avec les infos de payement fournit par l'utilisateurs crédité le compte/wallet mangopay de celui-ci du montant de la commande
    --> Sauvegarder la commande dans la base de données en état 'en attente de réalisation'

    --> envoyer un mail au client, résumant la commande

    ---> La reservation doit desormais être visible par le coach.
    ---> La reservation doit désormais être visible par l'utilisateurs
    */
}
