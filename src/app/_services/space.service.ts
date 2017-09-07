import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class SpaceService {
    public setLoggedEmitter: Observable<boolean>;
    public setZoneEmitter: Observable<string>;
    public setTopBarEmitter: Observable<boolean>;
    public setHeaderAboveEmitter: Observable<boolean>;

    private jwtHelper: JwtHelper = new JwtHelper();
    private logged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    private showTopBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    private zone: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    private userId: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    private headerAbove: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {
        this.setLoggedEmitter = this.logged.asObservable();
        this.setZoneEmitter = this.zone.asObservable();
        this.setTopBarEmitter = this.showTopBar.asObservable();
        this.setHeaderAboveEmitter = this.headerAbove.asObservable();
        this.toggleTopBar(true);

        this.refreshSpace();
    }

    public refreshSpace(): void {
        let token = localStorage.getItem('currentAccount');
        if (token == null || this.jwtHelper.isTokenExpired(token)) {
            if (token != null) {
                localStorage.removeItem('currentAccount');
            }
            this.setLogged(false);
            this.setUserId(0);
            this.setZone('default');
            return;
        }
        let tokenpayload = this.jwtHelper.decodeToken(token);
        this.setUserId(tokenpayload.id);
        this.setLogged(true);
        this.toggleTopBar(false);
        if (tokenpayload.roles.filter( (r) => r.indexOf('ROLE_USER') !== -1).length > 0) {
            this.setZone('ROLE_USER');
        }
        if (tokenpayload.roles.filter( (r) => r.indexOf('ROLE_PARTNER') !== -1).length > 0) {
            this.setZone('ROLE_PARTNER');
        }
        this.setUserId(tokenpayload.id);
    }

    public setLogged(logged: boolean) {
        this.logged.next(logged);
    }

    public getLogged(): boolean {
        return this.logged.getValue();
    }

    public setUserId(id: number) {
        this.userId.next(id);
    }

    public getUserId(): number {
        return this.userId.getValue();
    }

    public toggleTopBar(show: boolean) {
        this.showTopBar.next(show);
    }

    public setZone(zone: string) {
        this.zone.next(zone);
    }

    public getZone(): string {
        return this.zone.getValue();
    }

    public setHeaderAbove(val: boolean) {
        this.headerAbove.next(val);
    }

    public getHeaderAbove(): boolean {
        return this.headerAbove.getValue();
    }
}
