import { Injectable } from '@angular/core';
import { testData } from './test-data';
import { UserData } from './test-data.types';

const copy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

@Injectable({
  providedIn: 'root',
})
export class TestDataService {
  private readonly mockDelayMs = 500;

  public getData(
    search: string,
    top: number,
    skip: number
  ): Promise<{ pageRows: UserData[]; totalRowCount: number }> {
    const filteredRows = testData.filter((one) =>
      one.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

    return this.mockDelay({
      pageRows: copy(filteredRows.slice(skip, skip+top)),
      totalRowCount: filteredRows.length,
    });
  }

  private mockDelay<T>(value: T): Promise<T> {
    return new Promise((res) => {
      setTimeout(() => res(value), this.mockDelayMs);
    });
  }
}
