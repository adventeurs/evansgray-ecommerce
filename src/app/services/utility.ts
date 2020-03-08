import { Subscription } from 'rxjs';

export function unsubscriber ( ...subscriptions: Subscription[]) {
  subscriptions
    .filter(sub => sub instanceof Subscription && typeof sub.unsubscribe === 'function')
    .forEach(sub => sub.unsubscribe());
}

