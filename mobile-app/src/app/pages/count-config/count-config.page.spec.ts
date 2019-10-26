import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountConfigPage } from './count-config.page';

describe('CountConfigPage', () => {
  let component: CountConfigPage;
  let fixture: ComponentFixture<CountConfigPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountConfigPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
