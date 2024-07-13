export interface BasketItem {
    productId: number;
    ime: string;
    cijena: number;
    slika: string;
    kolicina: number;
    datumIznajmljivanja: number;
    datumVracanja: number;
    
  }

 export interface Basket {
    id: number;
    buyerId: string;
    items: BasketItem[];
    paymentIntentId?:string;
    clientSecret?: string;
    days: number;
  }