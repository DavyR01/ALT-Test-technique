export type Customer = {
  id: string;
  fullName: string;
  level: string;
  zone: string;
  currency: string;
};

export type Order = {
  id: string;
  customerId: string;
  productId: string;
  quantity: number;
  date: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  weight: number;
};

export type Promotion = {
  id: string;
  type: string;
  value: number;
  startDate: string;
  endDate: string;
};

export type ShippingZone = {
  zone: string;
  weightMin: number;
  weightMax: number;
  cost: number;
};
