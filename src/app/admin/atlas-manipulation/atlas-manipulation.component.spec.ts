import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtlasManipulationComponent } from './atlas-manipulation.component';

describe('AtlasManipulationComponent', () => {
  let component: AtlasManipulationComponent;
  let fixture: ComponentFixture<AtlasManipulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtlasManipulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtlasManipulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
