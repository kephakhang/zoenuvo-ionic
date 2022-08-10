import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsagreePage } from './termsagree.page';

describe('TermsagreePage', () => {
  let component: TermsagreePage;
  let fixture: ComponentFixture<TermsagreePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsagreePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsagreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
