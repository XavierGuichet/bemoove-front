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

import { AlertComponent } from './_directives/index';
import { AuthMemberGuard, AuthPartnerGuard } from './_guards/index';
import { AlertService, AuthenticationService,
        WorkoutService, CartService, SpaceService
        } from './_services/index';

// Pipes
import { MyTimePipe, MyTruncatePipe } from './_pipes/index';

// Forms
import { AccountManagerModule } from './account-manager/account-manager.module';

import { WelcomePartnerComponent } from './welcome/partner/partner.component';
import { PartnerRegistrationComponent } from './welcome/partner-registration/partner-registration.component';
import { HomeComponent } from './home/home.component';

import { TopBarPartnerRecruitComponent } from './topbar/partner-recruit/partner-recruit.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { FooterComponent } from './footer/footer.component';

import { PartnerModule } from './partner/partner.module';
import { MemberModule } from './member/member.module';
import { WorkoutListModule } from './workout-list/workout-list.module';
import { OrderModule } from './order/order.module';

import { TextChangerDirective, OnlyNumberDirective } from './_directives/index';
// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  // WorkoutService,
  AuthMemberGuard, AuthPartnerGuard,
  AlertService,
  AuthenticationService,
  SpaceService,
  CartService
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

    TopBarPartnerRecruitComponent,
    HeaderNavComponent,
    FooterComponent,

    WelcomePartnerComponent,
    PartnerRegistrationComponent,
    HomeComponent,

    AlertComponent,

    TextChangerDirective,
    OnlyNumberDirective
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
    AccountManagerModule,
    Angular2FontawesomeModule,
    PartnerModule,
    MemberModule,
    WorkoutListModule,
    OrderModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  entryComponents: [ ]
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
