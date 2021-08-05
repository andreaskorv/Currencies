import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table'  
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConvertationComponent } from './convertation/convertation.component';
import { CurrencySelectComponent } from './currency-select/currency-select.component';
import { HttpClientModule } from '@angular/common/http';
import { PeriodComponent } from './period/period.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NumberDirective } from './numbers-only.directive';

@NgModule({
  declarations: [
    AppComponent,
    ConvertationComponent,
    CurrencySelectComponent,
    PeriodComponent,
    NumberDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  providers: [
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
