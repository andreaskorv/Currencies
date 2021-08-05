import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Rate } from '../Rate';

@Component({
  selector: 'currency-select',
  templateUrl: './currency-select.component.html',
  styleUrls: ['./currency-select.component.scss']
})
export class CurrencySelectComponent implements OnInit {

  currencySelectForm = new FormGroup({
    selectedCurrency: new FormControl('')
  });

  currencies: string[] = [];
  currencyRates: Rate[] = [];
  displayedColumns: string[] = ['Currency', 'Rate'];


  forMap: any = (entry: [string, unknown]) : Rate => {
    return {symbol: entry[0], rate: entry[1] as number};
  }

  constructor(
    private infoService: InfoService
  ) {
    this.currencySelectForm.valueChanges.subscribe(() => this.getCurrencyRates());
   }

  ngOnInit(): void {
    this.getCurrencies();
  }

  getCurrencies(): void {
    this.infoService.getCurrencies()
      .subscribe(currencies => this.currencies = Object.keys(currencies));
  }

  getCurrencyRates(): void {
    if (this.currencySelectForm.value.selectedCurrency) {
      this.infoService.getCurrencyRates(this.currencySelectForm.value.selectedCurrency)
        .subscribe(currencyRates => this.currencyRates = Object.entries(currencyRates.rates).map<Rate>(this.forMap));
    }
  }

}