import { Product } from './product'
import { StripeOrderObject } from './stripeOrderObject';

export interface OrderData{
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