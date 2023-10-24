import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneExplorerComponent } from './gene-explorer.component';

describe('GeneExplorerComponent', () => {
  let component: GeneExplorerComponent;
  let fixture: ComponentFixture<GeneExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneExplorerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
