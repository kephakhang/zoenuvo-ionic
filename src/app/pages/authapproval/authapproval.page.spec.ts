import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthapprovalPage } from './authapproval.page';

describe('AuthapprovalPage', () => {
  let component: AuthapprovalPage;
  let fixture: ComponentFixture<AuthapprovalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthapprovalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthapprovalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
