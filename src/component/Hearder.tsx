import React from "react";
import { Link, Route, Routes } from "react-router";

const Header = () => {
  return (
    <div>
      Word Flip
      <nav>
        <Link to="/word-list">word-list</Link>
        <Link to="/flash-cards">flash-cards</Link>
        <Link to="/repeat-words">repeat-words</Link>
      </nav>
    </div>
  );
};

export default Header;
