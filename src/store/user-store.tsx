import { makeAutoObservable } from "mobx";

class UserStore {
  isLogged = false;
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
}

export default new UserStore();
