export interface ShippingAddress {
    fullName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
  }
   export interface OrderItem {
    productId: number;
    ime: string;
    slika: string;
    cijena: number;
    kolicina: number;
  }
  export interface Order {
    id: number;
    bUyerId: string;
    shippingAddress: ShippingAddress;
    orderData: string;
    orderItems: OrderItem[];
    subtotal: number;
    orderStatus: string;
    total: number;
    days: number;
  }