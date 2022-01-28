import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineActivateComponent } from './line-activate.component';

describe('LineActivateComponent', () => {
  let component: LineActivateComponent;
  let fixture: ComponentFixture<LineActivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LineActivateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
