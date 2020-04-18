import { Subscription } from 'rxjs';
import { ConfigService } from './config.service';


export function unsubscriber ( ...subscriptions: Subscription[]) {
  subscriptions
    .filter(sub => sub instanceof Subscription )
    .forEach(sub => sub.unsubscribe());
}

