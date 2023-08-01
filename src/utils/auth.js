import { BASE_URL } from "./const";

function checkResponse(res){
  return res.ok ? res.json() : Promise.reject(res.statusText)
}

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
  })
      .then(checkResponse)
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
  })
      .then(checkResponse)
      .then((data) => {
          if (data.token) {
              localStorage.setItem("token", data.token);
              return data;
          } else {
              return;
          }
      })
};

export const getContent = (token) => {
  return (
      fetch(`${BASE_URL}/users/me`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
      })
          .then(checkResponse)
  );
};
