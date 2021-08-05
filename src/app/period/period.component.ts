import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe, formatDate } from '@angular/common';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';
import { Chart, ChartItem, registerables } from 'chart.js';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMM YYYY',
  },
};

@Component({
  selector: 'period',
  templateUrl: './period.component.html',
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit {

  periodForm = new FormGroup({
    compareCurrency : new FormControl(''),
    toCurrency : new FormControl(''),
    forFirstDate: new FormControl(),
    forLastDate: new FormControl()
  });

  maxDate = new Date();
  currencies: string[] = [];

  dates: string[] = [];
  data: number[] = [];
  prevChart?: any;

  rework: any = (received: any) => {
    this.dates = Object.keys(received.rates);
    this.data = Object.values(received.rates).map(item => Object.values(item as any)[0] as number);
  }

  constructor(
    private infoService: InfoService
  ) {
    Chart.register(...registerables);
    this.periodForm.valueChanges.subscribe(() => this.getPeriodTable());
  }

  ngOnInit(): void {
    this.getCurrencies();
  }

  getCurrencies(): void {
    this.infoService.getCurrencies()
      .subscribe(currencies => this.currencies = Object.keys(currencies));
  }

  format(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US') || "";
  }






  createChart() {
    if (this.prevChart) {
      this.prevChart.destroy();
    }
    var ctx = document.getElementById('periodChart');
    console.log(ctx);
    var myChart = new Chart(ctx as ChartItem, {
    type: 'line',
    data: {
      labels: this.dates,
      datasets: [
          {
              data: this.data,
              pointBorderColor: "#000000",
              hoverBackgroundColor: "#000000",
              pointBackgroundColor: "#000000",
              hoverBorderColor: "#000000"
          },
        ]
    }
    });
    myChart.render();
    this.prevChart = myChart;
  }
  
  getPeriodTable() {
    if (this.periodForm.value.forFirstDate && this.periodForm.value.forLastDate && this.periodForm.value.compareCurrency && this.periodForm.value.toCurrency) {
      let start = this.format(this.periodForm.value.forFirstDate);
      let end = this.format(this.periodForm.value.forLastDate);
      this.infoService.getPeriodTable(this.periodForm.value.compareCurrency, this.periodForm.value.toCurrency, start, end).
        subscribe(received => {this.rework(received);
          this.createChart();
        });
    }
  }
}