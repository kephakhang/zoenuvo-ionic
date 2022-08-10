import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Idsearch2Page } from './idsearch2.page';

describe('Idsearch2Page', () => {
  let component: Idsearch2Page;
  let fixture: ComponentFixture<Idsearch2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Idsearch2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Idsearch2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
