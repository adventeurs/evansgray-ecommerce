import { Product } from "./product";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  stripeCustomerId?: string;
  orders?: Product[];
  admin?: boolean;
  abandonedCart?: Date;
}
