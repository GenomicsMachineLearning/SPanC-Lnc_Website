import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneExploerComponent } from './gene-exploer.component';

describe('GeneExploerComponent', () => {
  let component: GeneExploerComponent;
  let fixture: ComponentFixture<GeneExploerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneExploerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneExploerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
