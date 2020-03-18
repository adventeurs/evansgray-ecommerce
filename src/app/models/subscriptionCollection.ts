import { Subscription } from 'rxjs';

export interface SubscriptionCollection{
    [ key: string ]: Subscription;
}