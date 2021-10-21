import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsZoneComponent } from './reports-zone.component';

describe('ReportsZoneComponent', () => {
  let component: ReportsZoneComponent;
  let fixture: ComponentFixture<ReportsZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsZoneComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
