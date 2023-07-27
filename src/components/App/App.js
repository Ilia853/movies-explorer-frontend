import React from "react";
import "./App.css";
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import PageNotFound from "../PageNotFound/PageNotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import { cards } from "../../utils/const";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function App() {
  const navigate = useNavigate();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    navigate("/movies");
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login handleSubmitLogin={handleSubmitLogin} />} />
        <Route path="/movies" element={<Movies cards={cards} />} />
        <Route path="/saved-movies" element={<SavedMovies cards={cards} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
