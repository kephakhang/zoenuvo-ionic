import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pwsearch2Page } from './pwsearch2.page';

describe('Pwsearch2Page', () => {
  let component: Pwsearch2Page;
  let fixture: ComponentFixture<Pwsearch2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pwsearch2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pwsearch2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
