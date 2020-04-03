export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    sku: string;
    parent: string;
    quantity: number;
    type: string;
    inventory: number;
    main: string;
    searchable: string[];
  }