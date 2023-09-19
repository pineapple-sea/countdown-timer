import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import * as moment from 'moment';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  interval,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs';
import { TimerService } from 'src/app/store/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TimerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() timer: any;
  public isTimerStopped$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public subscribeTimerInterval: Subscription;
  public timerSecondsAmount: number = 0;

  constructor(public timerService: TimerService) {}

  ngOnInit() {
    this.startTimer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const timer = changes['timer'].currentValue;
    // this.isTimerStopped$.next(timer.isTimerStopped);

    this.calcullateTimerData(timer);
  }

  ngOnDestroy(): void {
    this.subscribeTimerInterval.unsubscribe();
  }

  public startTimer() {
    this.subscribeTimerInterval = interval(1000)
      .pipe(
        tap((seconds) => {
          if (seconds === this.timer.seconds) {
            this.deleteTimer(this.timer);
          }
        }),
        takeWhile(() => !this.isTimerStopped$.value)
      )
      .subscribe(() => {
        this.timerSecondsAmount--;
      });
  }

  public playTimer() {
    this.isTimerStopped$.next(false);
    this.startTimer();
    // this.toggleTimer();
  }

  public pauseTimer() {
    this.isTimerStopped$.next(true);
    // this.toggleTimer();
  }

  public deleteTimer(timer) {
    this.timerService.deleteTimer(timer);
    const timers = JSON.parse(localStorage.getItem('timers'));
    const filteredTimers = timers.filter((el) => {
      return el.name !== timer.name;
    });
    localStorage.setItem('timers', JSON.stringify(filteredTimers));
  }

  private calcullateTimerData(timer) {
    this.timerSecondsAmount = Math.ceil(
      moment(timer.date).add(timer.seconds, 'seconds').diff(moment()) / 1000
    );
  }

  private toggleTimer() {
    const storageTimers = JSON.parse(localStorage.getItem('timers'));
    const timers = storageTimers?.map((t) => {
      if (t.name === this.timer.name) {
        t.isTimerStopped = this.isTimerStopped$.value;
      }
      return t;
    });

    localStorage.setItem('timers', JSON.stringify(timers));
  }
}
