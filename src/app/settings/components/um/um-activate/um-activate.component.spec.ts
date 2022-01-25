import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmActivateComponent } from './um-activate.component';

describe('UmActivateComponent', () => {
  let component: UmActivateComponent;
  let fixture: ComponentFixture<UmActivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UmActivateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UmActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
