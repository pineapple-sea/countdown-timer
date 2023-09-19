import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, tap, timer } from 'rxjs';
import { TimerQuery } from 'src/app/store/timer.query';
import { TimerService } from 'src/app/store/timer.service';
import * as moment from 'moment';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  public timerForm: FormGroup;
  public timers$: Observable<any[]>;
  public seconds: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    public timerService: TimerService,
    public timerQuery: TimerQuery
  ) {
    this.initForm();
    this.timers$ = this.timerQuery.selectTimers$;
  }

  ngOnInit() {
    this.getLocalStorageTimers();
  }

  public createTimer(): void {
    if (this.timerForm.invalid) {
      return;
    }
    if (
      !this.timerForm.value.seconds &&
      !this.timerForm.value.minutes &&
      !this.timerForm.value.hours
    ) {
      return;
    }
    let date = moment();

    this.seconds =
      this.timerForm.value.hours * 60 * 60 +
      this.timerForm.value.minutes * 60 +
      this.timerForm.value.seconds;

    this.timerService.addTimer({
      name: this.timerForm.value.timerName,
      seconds: this.seconds,
      date,
    });

    const items = JSON.parse(localStorage.getItem('timers'));

    localStorage.setItem(
      'timers',
      JSON.stringify([
        ...(items || []),
        {
          name: this.timerForm.value.timerName,
          seconds: this.seconds,
          date,
        },
      ])
    );
  }

  private initForm(): void {
    this.timerForm = this.formBuilder.group({
      timerName: [null, [Validators.required, Validators.minLength(1)]],
      hours: [null],
      minutes: [null],
      seconds: [null],
    });
  }

  private getLocalStorageTimers() {
    const timers = JSON.parse(localStorage.getItem('timers'));
    this.timerService.addReloadTimers(timers || []);
  }
}
