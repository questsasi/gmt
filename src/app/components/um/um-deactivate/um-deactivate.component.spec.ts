import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmDeactivateComponent } from './um-deactivate.component';

describe('UmDeactivateComponent', () => {
  let component: UmDeactivateComponent;
  let fixture: ComponentFixture<UmDeactivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UmDeactivateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UmDeactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
