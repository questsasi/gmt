import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteProductionComponent } from './confirm-delete-production.component';

describe('ConfirmDeleteProductionComponent', () => {
  let component: ConfirmDeleteProductionComponent;
  let fixture: ComponentFixture<ConfirmDeleteProductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDeleteProductionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
