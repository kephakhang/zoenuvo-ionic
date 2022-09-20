import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupcompletePage } from './signupcomplete.page';

describe('SignupcompletePage', () => {
  let component: SignupcompletePage;
  let fixture: ComponentFixture<SignupcompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupcompletePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupcompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
