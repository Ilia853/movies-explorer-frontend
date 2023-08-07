import { BASE_URL } from "./const";

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.statusText);
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setToken(token) {
    this._headers = {
      ...this._headers,
      authorization: `Bearer ${token}`,
    };
  }
}

const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: {
      // authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQxMTFlMzg3NWFiNjM3YTBhOGFmYTgiLCJpYXQiOjE2OTE0MzI2NjksImV4cCI6MTY5MjAzNzQ2OX0.4HZzrUEoesNsc1NsPF-ntaEpFHST-IdcL_RuW0dsMrE",
      "Content-Type": "application/json",
  },
})

export default mainApi;