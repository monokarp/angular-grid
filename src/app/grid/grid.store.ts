import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GridAction } from './grid.types';

@Injectable()
export class GridStore<T> {
  public readonly cellAction$ = new Subject<GridAction<T>>();
}
