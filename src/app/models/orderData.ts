import { Product } from './product'

export interface OrderData{
customer: string;
currency: string;
items: Product[];
shipping: {
  address: {
    city: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
  },
  name: string;
    }
}