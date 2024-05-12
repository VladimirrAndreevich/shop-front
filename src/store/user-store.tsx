import { I_CartItem } from "@/types";
import { makeAutoObservable } from "mobx";

class UserStore {
  isLogged = false;
  cart?: I_CartItem[];
  token?: string;

  constructor() {
    makeAutoObservable(this);
  }

  initToken = (_token: string | null) => {
    if (_token !== null) {
      this.token = _token;
      this.checkAuth();
    } else {
      console.warn("No token provided");
    }
  };

  checkAuth = async () => {
    const response = await fetch(
      `${process.env.API_URL_BACKEND}/users/check-auth`,
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );

    if (response.ok) {
      this.isLogged = true;
    }

    const formattedResponse = await response.json();
    console.log(formattedResponse);
  };

  async addItemCart(productId: number, size: string) {
    if (!this.isLogged) {
      // throw new Error("Error access! Unauthorized.");
      return;
    }

    const response = await fetch(
      `${process.env.API_URL_BACKEND}/users/cart/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          productId,
          createCartItemData: {
            size,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error adding item to cart");
    }
  }
}

let userStore: UserStore;

export const getStoreInstance = (): UserStore => {
  if (!userStore) {
    userStore = new UserStore();
  }
  return userStore;
};