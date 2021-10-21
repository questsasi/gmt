import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsLineComponent } from './reports-line.component';

describe('ReportsLineComponent', () => {
  let component: ReportsLineComponent;
  let fixture: ComponentFixture<ReportsLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsLineComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
