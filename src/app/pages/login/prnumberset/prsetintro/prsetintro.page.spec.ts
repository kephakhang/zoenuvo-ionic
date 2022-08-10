import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrsetintroPage } from './prsetintro.page';

describe('PrsetintroPage', () => {
  let component: PrsetintroPage;
  let fixture: ComponentFixture<PrsetintroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrsetintroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrsetintroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
