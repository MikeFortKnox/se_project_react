import React, { useContext, useState } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, handleCardLike }) {
  // const [isLiked, setIsLiked] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  console.log(item);
  const isLiked = item.likes.some((id) => {
    id === currentUser._id;
  });
  console.log(isLiked);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = () => {
    console.log(item._id);
    handleCardLike(item._id, isLiked);
  };

  return (
    <li className="card">
      <div className="card__name-container">
        <h2 className="card__name">{item.name}</h2>
        <button
          className="card__like-button"
          onClick={handleLikeClick}
        ></button>
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      ></img>
    </li>
    //add like buttons
    //pass handleCardLike to here
  );
}

export default ItemCard;
