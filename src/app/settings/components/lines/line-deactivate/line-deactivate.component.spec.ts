import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineDeactivateComponent } from './line-deactivate.component';

describe('LineDeactivateComponent', () => {
  let component: LineDeactivateComponent;
  let fixture: ComponentFixture<LineDeactivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LineDeactivateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineDeactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
