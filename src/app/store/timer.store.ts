import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface TimerState {
  timers: any[];
}

export function createInitialState(): TimerState {
  return {
    timers: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'timer' })
export class TimerStore extends Store<TimerState> {
  constructor() {
    super(createInitialState());
  }
}
