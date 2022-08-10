import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdsearchPage } from './idsearch.page';

describe('IdsearchPage', () => {
  let component: IdsearchPage;
  let fixture: ComponentFixture<IdsearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdsearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdsearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
