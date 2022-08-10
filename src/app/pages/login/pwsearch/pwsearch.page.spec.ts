import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwsearchPage } from './pwsearch.page';

describe('PwsearchPage', () => {
  let component: PwsearchPage;
  let fixture: ComponentFixture<PwsearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwsearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwsearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
