import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteTargetComponent } from './confirm-delete-target.component';

describe('ConfirmDeleteTargetComponent', () => {
  let component: ConfirmDeleteTargetComponent;
  let fixture: ComponentFixture<ConfirmDeleteTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDeleteTargetComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
