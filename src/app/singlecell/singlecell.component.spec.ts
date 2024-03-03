import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglecellComponent } from './singlecell.component';

describe('SinglecellComponent', () => {
  let component: SinglecellComponent;
  let fixture: ComponentFixture<SinglecellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglecellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglecellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
