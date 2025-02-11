import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ handleEditClick, handleLogoutClick }) {
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);
  return (
    <div className="sidebar__container">
      <div className="sidebar">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt="User avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
        <button
          onClick={handleEditClick}
          type="button"
          className="sidebar__edit-profile-btn"
        >
          Edit Profile
        </button>
        <button
          onClick={handleLogoutClick}
          type="button"
          className="sidebar__signout-btn"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
