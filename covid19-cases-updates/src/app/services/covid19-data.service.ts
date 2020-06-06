import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GlobalDataEntity } from '../models/global-data';

@Injectable({
  providedIn: 'root'
})
export class Covid19DataService {

  private globalDataURL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/06-05-2020.csv';

  constructor(private httpClient: HttpClient) { }

  getGlobalData(): Observable<any> {
    return this.httpClient.get(this.globalDataURL, { responseType: 'text' }).pipe(
      map(results => {
        const globalData = {};
        const rows = results.split('\n');
        rows.splice(0, 1);  // removing the header row

        rows.forEach(row => {
          const columns = row.split(/,(?=\S)/);
          const currentCol: GlobalDataEntity = {
            country: columns[3],
            confirmedCases: +columns[7],
            deathCases: +columns[8],
            recoveredCases: +columns[9],
            activeCases: +columns[10]
          };

          const countryData: GlobalDataEntity = globalData[currentCol.country];
          if (countryData) {
            countryData.confirmedCases += currentCol.confirmedCases;
            countryData.deathCases += currentCol.deathCases;
            countryData.recoveredCases += currentCol.recoveredCases;
            countryData.activeCases += currentCol.activeCases;
            globalData[currentCol.country] = countryData;
          } else {
            globalData[currentCol.country] = currentCol;
          }
        });
        return Object.values(globalData) as GlobalDataEntity[];
      })
    );
  }
}
