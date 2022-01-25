import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmEditComponent } from './um-edit.component';

describe('UmEditComponent', () => {
  let component: UmEditComponent;
  let fixture: ComponentFixture<UmEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UmEditComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UmEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
