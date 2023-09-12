import { MOVIES_URL } from "./const";

class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.statusText);
  }

  getInitialMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;
