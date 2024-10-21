import { Injectable } from '@angular/core';
import { testData } from './test-data';
import { UserData } from './test-data.types';

const copy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

@Injectable({
  providedIn: 'root',
})
export class TestDataService {
  private readonly mockDelayMs = 500;

  private testData = testData;

  public getData(
    search: string,
    top: number,
    skip: number
  ): Promise<{ rows: UserData[]; totalRowCount: number }> {
    const filteredRows = this.testData.filter((one) =>
      one.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );

    return this.mockDelay({
      rows: copy(filteredRows.slice(skip, skip + top)),
      totalRowCount: filteredRows.length,
    });
  }

  public async delete(rowId: string): Promise<void> {
    debugger;
    this.testData = this.testData.filter((one) => one.id !== rowId);

    await this.mockDelay(null);
  }

  private mockDelay<T>(value: T): Promise<T> {
    return new Promise((res) => {
      setTimeout(() => res(value), this.mockDelayMs);
    });
  }
}
