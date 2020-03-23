import { Product } from './product'
import { StripeOrderObject } from './stripeOrderObject';
import { EmailValidator } from '@angular/forms';

export interface OrderData{
email: string;
customer: string;
currency: string;
items: StripeOrderObject[];
shipping: {
  address: {
    city: string;
    line1: string;
    line2: string;
    postal_code: number;
    state: string;
  },
  name: string;
    }
}