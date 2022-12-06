export interface Product {
   
  
    id: number;
    url: string;
    name: string;
    price: number;
    inventory?: number;
}

export interface CartProduct {

    id: number;
    url: string;
    name: string;
    price: number;
    quantity: number;
}

export interface AllProduct {
    id: number;
    url: string;
    name: string;
    price: number;
    inventory: number;
    quantity: number;
}