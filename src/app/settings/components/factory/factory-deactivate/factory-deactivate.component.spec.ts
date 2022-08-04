import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryDeactivateComponent } from './factory-deactivate.component';

describe('FactoryDeactivateComponent', () => {
  let component: FactoryDeactivateComponent;
  let fixture: ComponentFixture<FactoryDeactivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FactoryDeactivateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryDeactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
