import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignuptypePage } from './signuptype.page';

describe('SignuptypePage', () => {
  let component: SignuptypePage;
  let fixture: ComponentFixture<SignuptypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignuptypePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignuptypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
