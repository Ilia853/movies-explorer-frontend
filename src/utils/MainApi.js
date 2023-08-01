import { BASE_URL } from "./const";

class MainApi {
  constructor ({ baseUrl, headers }) {
    this._baseUrls = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.statusText);
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._headers,
    })
        .then(this._checkResponse)
  }
}

const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: {
      // authorization: "8a397027-da49-4dae-80f0-d28f54047f14",
      "Content-Type": "application/json",
  },
})

export default mainApi;