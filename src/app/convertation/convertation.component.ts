import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'convertation',
  templateUrl: './convertation.component.html',
  styleUrls: ['./convertation.component.scss']
})
export class ConvertationComponent implements OnInit {

  currencies: string[] = [];

  convertationForm = new FormGroup({
    fromCurrency: new FormControl(''),
    toCurrency: new FormControl(''),
    forAmount: new FormControl()
  })

  result?: string;

  constructor(
    private infoService: InfoService
  ) { }

  ngOnInit(): void {
    this.getCurrencies();
    this.convertationForm.valueChanges.subscribe(value => this.getConverted());
  }

  getCurrencies(): void {
    this.infoService.getCurrencies()
      .subscribe(currencies => this.currencies = Object.keys(currencies));
  }

  ngOnChanges(): void {
    this.getConverted();
  }

  getConverted(): void {
    if (this.convertationForm.value.fromCurrency && this.convertationForm.value.toCurrency && this.convertationForm.value.forAmount) {
      this.infoService.getConvertation(this.convertationForm.value.fromCurrency, this.convertationForm.value.toCurrency, this.convertationForm.value.forAmount)
        .subscribe(result => {this.result = Object.values(result.rates)[0] as string});
    }
  }


_keyUp(event: any) {
  const pattern = /[0-9\+\-\.\ ]/;
  let inputChar = String.fromCharCode(event.key);

  if (!pattern.test(inputChar)) {
    // invalid character, prevent input
    event.preventDefault();
  }

  }
}