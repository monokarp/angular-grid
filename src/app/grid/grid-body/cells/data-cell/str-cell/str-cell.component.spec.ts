import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrCellComponent } from './str-cell.component';

describe('StrCellComponent', () => {
  let component: StrCellComponent;
  let fixture: ComponentFixture<StrCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
