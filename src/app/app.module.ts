import { NgModule, ApplicationRef, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './custom-material.module';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { Ng2SimplePageScrollModule } from 'ng2-simple-page-scroll';
import './rxjs-extensions';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { NoContentComponent } from './no-content';

// import { SportySubscribeModalComponent  } from './modal/sporty-subscribe/sporty-subscribe-modal';

import { AlertComponent } from './_directives/index';
import { AuthUserGuard, AuthCoachGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';

// Forms
// import { SubscribeFormReactiveModule } from './form/subscribe/subscribe-form-reactive.module';
import { UserManagerModule } from './user-manager/user-manager.module';

import { WelcomeCoachComponent } from './welcome/coach/coach.component';
import { HomeComponent } from './home/home.component';

import { TopBarCoachRecruitComponent } from './topbar/coach-recruit/coach-recruit.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { FooterComponent } from './footer/footer.component';

import { CoachModule } from './coach/coach.module';
import { WorkoutListModule } from './workout-list/workout-list.module';

import { WorkoutService } from './_services/workout.service';
import { TagService } from './tag-service/tag.service';

import { SpaceService } from './_services/space.service';

import { TextChangerDirective } from './_directives/text-changer.attribute';
// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  // WorkoutService,
  AuthUserGuard, AuthCoachGuard,
  AlertService,
  AuthenticationService,
  UserService,
  SpaceService
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    NoContentComponent,

    TopBarCoachRecruitComponent,
    HeaderNavComponent,
    FooterComponent,

    WelcomeCoachComponent,
    HomeComponent,

    // SportySubscribeModalComponent,

    AlertComponent,

    TextChangerDirective
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules }),
    NgbModule.forRoot(),
    CustomMaterialModule,
    UserManagerModule,
    Angular2FontawesomeModule,
    Ng2SimplePageScrollModule.forRoot(),
    CoachModule,
    WorkoutListModule,
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  entryComponents: [ ]
  // entryComponents: [ SportySubscribeModalComponent ]
})

export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
