import { Subscription } from 'rxjs';


export function unsubscriber ( ...subscriptions: Subscription[]) {
  subscriptions
    .filter(sub => sub instanceof Subscription )
    .forEach(sub => sub.unsubscribe());
}

