import { Injectable } from '@angular/core';
import { TimerStore } from './timer.store';

@Injectable({ providedIn: 'root' })
export class TimerService {
  constructor(private timerStore: TimerStore) {}

  addTimer(timer: any) {
    this.timerStore.update({
      timers: [...this.timerStore.getValue().timers, timer],
    });
  }

  addReloadTimers(timers: any) {
    this.timerStore.update({
      timers: timers,
    });
  }

  updateTimer(timer) {
    this.timerStore.update({
      timers: this.timerStore.getValue().timers.map((el) => {
        if (el.name === timer.name) {
          return timer;
        }
        return el;
      }),
    });
  }

  deleteTimer(timer) {
    this.timerStore.update({
      timers: this.timerStore.getValue().timers.filter((el) => {
        return el.name !== timer.name;
      }),
    });
  }
}
