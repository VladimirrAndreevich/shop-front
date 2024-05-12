export enum E_Type {
  sneakers = "sneakers",
  boots = "boots",
  slippers = "slippers",
}

export interface I_ProductCard {
  id: number;
  mainImage: string;
  images: string[];
  price: number;
  priceDiscounted?: number;
  title: string;
  type: E_Type;
  // isLiked: boolean;
}

export interface I_CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  size: string;
}

export interface I_UniRes {
  status: "ok" | "error";
  data?: any;
  errorMessage?: string;
}

export interface I_ProductsRes extends I_UniRes {
  data: I_ProductCard[];
}
export interface I_ProductsByTypeRes extends I_UniRes {
  data: {
    products: I_ProductCard[];
    amount: number;
  };
}

export interface I_ProductRes extends I_UniRes {
  data: I_ProductCard;
}

export interface I_LoginRes extends I_UniRes {
  data: {
    accessToken: string;
  };
}
export interface I_RegisterRes extends I_UniRes {
  data: {
    accessToken: string;
  };
}
