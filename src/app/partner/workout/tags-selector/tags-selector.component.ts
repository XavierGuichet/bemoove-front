import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Headers } from '@angular/http';

import { CompleterService, RemoteData, CompleterData } from 'ng2-completer';

import { Tag } from '../../../models/tag';
import {
  TagService } from '../../../_services/index';

@Component({
  selector: 'tags-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
        <div [formGroup]="parent" class="row">
          <div class="col-7">
              <ng2-completer
                  [inputClass]="'form-control'"
                  [(ngModel)]="tag"
                  [ngModelOptions]="{standalone: true}"
                  [dataService]="tagDataService"
                  (selected)="selectTag($event)"
                  [textNoResults]="false"
                  [clearSelected]="true" >
              </ng2-completer>
          </div>
          <div class="col-5">
              <button type="button" [disabled]="loading" mat-raised-button color="accent" (click)="addTag()">
              <mat-icon class="mat-24">add</mat-icon>Ajouter
              </button>
          </div>
        </div>
    `
})

export class TagsSelectorComponent {
  @Input()
  public parent: FormGroup;

  @Input()
  public selected: Tag[];

  @Output()
  public select = new EventEmitter<Tag>();

  public loading: boolean = false;
  public tag: string;
  public tagDataService: RemoteData;
  private TagsUrl = 'http://' + process.env.API_URL + '/tags';

  constructor(
    private tagService: TagService,
    private completerService: CompleterService
  ) {
    this.tagDataService = this.completerService.remote(
      this.TagsUrl + '?name=',
      'name',
      'name');

    this.tagDataService.headers(new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }));
  }

  public selectTag(event) {
    if (event == null || event.title.trim().length === 0 ||
      this.selected.filter((t) => t.name === event.title.trim()).length > 0
    ) {
      return;
    }
    if (event.originalObject != null) {
      this.select.emit(event.originalObject);
    }
  }

  // this system create duplicate. Api will handle this by returning main object
  // but this should not try to create if not needed
  public addTag() {
    let tagName = this.tag.trim();
    if (tagName.length > 0) {
      this.loading = true;
      let newTag = new Tag();
      newTag.name = tagName;
        this.tagService.create(newTag).subscribe(
            (data) => {
                this.loading = false;
                this.tag = '';
                this.select.emit(data);
            },
            (error) => {
              alert('echec de l\'ajout du tag');
            });
          return;
    }
  }

  public onSelect(tag: Tag) {
    this.select.emit(tag);
  }
}
