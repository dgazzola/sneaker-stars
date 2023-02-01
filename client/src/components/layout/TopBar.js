import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new" className="button">sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        sign Up
      </Link>
    </li>,
  ];

  let id = ""
  if(user){
    id = user.id
  }


  const authenticatedListItems = [
    <li key="user-profile">
      <Link to={`/users/${id}`}>
        to my profile
      </Link>
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">sneaker stars</li>
          <li>
            <Link to="/">home</Link>
          </li>
          <li className="menu-text">
            search:
          </li>
          <li>
          <input type="text" />
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
