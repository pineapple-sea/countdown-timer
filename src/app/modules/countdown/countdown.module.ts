import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountdownComponent } from './container/countdown.component';
import { CountdownRoutingModule } from './countdown-routing.module';
import { TimerComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { ConvertTimePipe } from './pipes/convert-time.pipe';

@NgModule({
  declarations: [
    CountdownComponent,
    TimerComponent,
    ConvertTimePipe
  ],
  imports: [
    CommonModule,
    CountdownRoutingModule,
    ReactiveFormsModule,
  ]
})
export class CountdownModule { }
