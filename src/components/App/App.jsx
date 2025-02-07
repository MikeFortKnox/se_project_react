import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import ItemCard from "../ItemCard/ItemCard";
import ClothesSection from "../ClothesSection/ClothesSection";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import {
  getItems,
  addItems,
  deleteItem,
  checkResponse,
  createUser,
  loginUser,
  addCardLike,
  removeCardLike,
  updateUserProfile,
  getCurrentUser,
} from "../../utils/api.js";
// import { updateUser } from "../../../../se_project_express-main/controllers/users.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [addClothingItems, setAddClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleEditClick = () => {
    setActiveModal("edit");
  };

  const handleRegister = () => {
    setActiveModal("register");
  };

  const handleLogin = () => {
    setActiveModal("login");
  };

  const handleOpenDeleteModal = () => {
    setActiveModal("delete item");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onAddItem = (name, imageUrl, weather) => {
    addItems({ name, imageUrl, weather })
      .then((data) => {
        console.log(data);
        setClothingItems((ClothingItems) => [data.data, ...ClothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onDeleteItem = () => {
    deleteItem(selectedCard._id)
      .then(() => {
        const updatedClothingItems = clothingItems.filter(
          (item) => item._id !== selectedCard._id
        );
        setClothingItems(updatedClothingItems);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
      });
  };

  const handleRegisterModalSubmit = (name, email, password, avatar) => {
    return createUser({ name, email, password, avatar })
      .then((data) => {
        // fetch to the express server to create a user in the database
        // call some function to log the user in. ie: handleLoginModalSubmit
        // close the modal
        closeActiveModal();
        handleLoginModalSubmit(email, password);
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  const handleLoginModalSubmit = (email, password) => {
    return loginUser({ email, password }).then((data) => {
      localStorage.setItem("token", data.token);
      setCurrentUser(data.user);
      setIsLoggedIn(true);
      closeActiveModal();
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getCurrentUser()
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setCurrentUser("");
          setIsLoggedIn(false);
        });
    }
    // check if the token exists in localStorage
    // if it does exists, we want to "log the user in" (by fetching to get the user's info using the token)
    // once the server gives us the user info, we want to set that user info in our currentUser state and set our isLoggedIn state to true
  }, []);

  const handleCardLike = (id, isLiked) => {
    const token = localStorage.getItem("token");
    // Check if this card is not currently liked
    return !isLiked
      ? // if so, send a request to add the user's id to the card's likes array

        // the first argument is the card's id
        addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array

        // the first argument is the card's id
        removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
  };

  async function handleEditModalSubmit(name, avatar) {
    try {
      const updatedUser = await updateUserProfile(name, avatar);
      setCurrentUser(updatedUser.data);
      closeActiveModal();
    } catch (error) {
      console.error("Failed to update User:", error);
    }
  }

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={currentUser}>
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleLogin={handleLogin}
              handleRegister={handleRegister}
              currentUser={currentUser}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    clothingItems={clothingItems}
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    handleCardLike={handleCardLike}
                  />
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <Profile
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    handleEditClick={handleEditClick}
                    handleCardLike={handleCardLike}
                    handleLogoutClick={handleLogout}
                  />
                }
              ></Route>
            </Routes>

            <Footer />
          </div>

          {activeModal === "add-garment" && (
            <AddItemModal
              onClose={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              onAddItem={onAddItem}
            />
          )}
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteItem={handleOpenDeleteModal}
          />
          <DeleteConfirmModal
            isOpen={activeModal === "delete item"}
            onClose={closeActiveModal}
            onConfirm={onDeleteItem}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegisterModalSubmit={handleRegisterModalSubmit}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLoginModalSubmit}
          />

          <EditProfileModal
            isOpen={activeModal === "edit"}
            onClose={closeActiveModal}
            onRegisterModalSubmit={handleEditModalSubmit}
            currentUser={currentUser}
          />
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
