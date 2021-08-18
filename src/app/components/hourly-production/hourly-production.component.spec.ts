import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyProductionComponent } from './hourly-production.component';

describe('HourlyProductionComponent', () => {
  let component: HourlyProductionComponent;
  let fixture: ComponentFixture<HourlyProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HourlyProductionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
