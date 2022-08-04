import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneDeactivateComponent } from './zone-deactivate.component';

describe('ZoneDeactivateComponent', () => {
  let component: ZoneDeactivateComponent;
  let fixture: ComponentFixture<ZoneDeactivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ZoneDeactivateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneDeactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
