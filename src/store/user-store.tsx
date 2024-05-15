import { I_CartItem, I_CartRes } from "@/types";
import { makeAutoObservable, runInAction } from "mobx";

class UserStore {
  isLogged = false;
  cart?: I_CartItem[];
  token?: string;
  isAddingToCart? = false;
  isRemovingFromCart? = false;
  totalCartItems?: number;

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
    this.updateCart();
  };

  async addItemCart(productId: number, size: string) {
    if (!this.isLogged) {
      // throw new Error("Error access! Unauthorized.");
      return;
    }

    this.isAddingToCart = true;

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

    await this.updateCart();

    this.isAddingToCart = false;
  }

  async removeItemCart(productId: number, size: string) {
    if (!this.isLogged) {
      // throw new Error("Error access! Unauthorized.");
      return;
    }

    this.isRemovingFromCart = true;

    const response = await fetch(
      `${process.env.API_URL_BACKEND}/users/cart/remove`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          productId,
          removeCartItemData: {
            size,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error removing item to cart");
    }

    await this.updateCart();

    this.isRemovingFromCart = false;
  }

  async updateCart() {
    if (!this.isLogged) {
      // throw new Error("Error access! Unauthorized.");
      return;
    }

    const response = await fetch(`${process.env.API_URL_BACKEND}/users/cart`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error getting the cart");
    }

    const formattedResponse: I_CartRes = await response.json();
    // console.log(formattedResponse.cart);

    runInAction(() => {
      this.cart = formattedResponse.cart;
      this.totalCartItems = formattedResponse.total;
    });
  }

  logout() {
    localStorage.removeItem("token");
    this.isLogged = false;
    this.token = undefined;
  }
}

let userStore: UserStore;

export const getStoreInstance = (): UserStore => {
  if (!userStore) {
    userStore = new UserStore();
  }
  return userStore;
};
