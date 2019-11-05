import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountSuccessPage } from './count-success.page';

describe('CountSuccessPage', () => {
  let component: CountSuccessPage;
  let fixture: ComponentFixture<CountSuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountSuccessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
