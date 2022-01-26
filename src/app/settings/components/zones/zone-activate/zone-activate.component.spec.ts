import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneActivateComponent } from './zone-activate.component';

describe('ZoneActivateComponent', () => {
  let component: ZoneActivateComponent;
  let fixture: ComponentFixture<ZoneActivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZoneActivateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
