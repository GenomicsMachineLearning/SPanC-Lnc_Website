import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutManipulationComponent } from './about-manipulation.component';

describe('AboutManipulationComponent', () => {
  let component: AboutManipulationComponent;
  let fixture: ComponentFixture<AboutManipulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutManipulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutManipulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
