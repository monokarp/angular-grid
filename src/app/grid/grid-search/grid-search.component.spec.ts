import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridSearchComponent } from './grid-search.component';

describe('GridSearchComponent', () => {
  let component: GridSearchComponent;
  let fixture: ComponentFixture<GridSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
