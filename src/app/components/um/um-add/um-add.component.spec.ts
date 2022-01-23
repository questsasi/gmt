import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmAddComponent } from './um-add.component';

describe('UmAddComponent', () => {
  let component: UmAddComponent;
  let fixture: ComponentFixture<UmAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UmAddComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UmAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
