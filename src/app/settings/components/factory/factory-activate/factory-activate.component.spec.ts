import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryActivateComponent } from './factory-activate.component';

describe('FactoryActivateComponent', () => {
  let component: FactoryActivateComponent;
  let fixture: ComponentFixture<FactoryActivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FactoryActivateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
