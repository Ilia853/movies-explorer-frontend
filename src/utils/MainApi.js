import { BASE_URL, MOVIES_URL } from "./const";

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

  editProfile(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this._checkResponse);
  }

  createMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${MOVIES_URL}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
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