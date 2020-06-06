import { Component, OnInit } from '@angular/core';
import { Covid19DataService } from 'src/app/services/covid19-data.service';
import { GlobalDataEntity } from 'src/app/models/global-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  globalCOVID19Data: GlobalDataEntity[];
  globalConfirmedCases = 0;
  globalDeathCases = 0;
  globalRecoveredCases = 0;
  globalActiveCases = 0;

  constructor(private dataService: Covid19DataService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe(
      {
        next: (globalData) => {
          console.log(globalData);
          this.globalCOVID19Data = globalData;
          globalData.forEach((country: GlobalDataEntity) => {
            if (!Number.isNaN(country.confirmedCases)) {
              this.globalConfirmedCases += country.confirmedCases;
              this.globalDeathCases += country.deathCases;
              this.globalRecoveredCases += country.recoveredCases;
              this.globalActiveCases += country.activeCases;
            }
          });
        }
      }
    );
  }

}
