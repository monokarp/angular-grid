import { Injectable } from '@angular/core';
import { testData } from './test-data';
import { UserData } from './test-data.types';

const copy = (obj: Object) => JSON.parse(JSON.stringify(obj));

@Injectable({
  providedIn: 'root',
})
export class TestDataService {
  private readonly mockDelayMs = 500;

  constructor() {}

  public all(): UserData[] {
    return copy(testData);
  }

  public getRows(top: number, skip: number): Promise<UserData[]> {
    return this.mockDelay(copy(testData.slice(skip, top)));
  }

  public countAll(): Promise<number> {
    return this.mockDelay(testData.length);
  }

  private mockDelay<T>(value: T): Promise<T> {
    return new Promise((res) => {
      setTimeout(() => res(value), this.mockDelayMs);
    });
  }
}
