import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { TimerStore, TimerState } from './timer.store';

@Injectable({ providedIn: 'root' })
export class TimerQuery extends Query<TimerState> {
  public selectTimers$ = this.select('timers');

  constructor(store: TimerStore) {
    super(store);
  }
}
