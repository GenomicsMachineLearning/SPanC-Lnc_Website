import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpatialongreadComponent } from './spatialongread.component';

describe('SpatialongreadComponent', () => {
  let component: SpatialongreadComponent;
  let fixture: ComponentFixture<SpatialongreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpatialongreadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpatialongreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
