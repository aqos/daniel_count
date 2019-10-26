import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountBeforePage } from './count-before.page';

describe('CountBeforePage', () => {
  let component: CountBeforePage;
  let fixture: ComponentFixture<CountBeforePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountBeforePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountBeforePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
