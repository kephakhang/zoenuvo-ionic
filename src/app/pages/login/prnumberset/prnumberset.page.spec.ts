import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrnumbersetPage } from './prnumberset.page';

describe('PrnumbersetPage', () => {
  let component: PrnumbersetPage;
  let fixture: ComponentFixture<PrnumbersetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrnumbersetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrnumbersetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
