import React from 'react';
import { Link } from 'react-router-dom';
import {
  AiOutlineHome, AiFillAudio, AiOutlineSetting,
} from 'react-icons/ai';

const Header = () => (
  <header className="d-flex px-4 py-1 align-items-center justify-content-between">
    <Link to="/">
      <AiOutlineHome size={25} />
    </Link>
    <h1>Soccer Hub</h1>
    <div className="d-flex gap-4">
      <AiFillAudio size={25} />
      <AiOutlineSetting size={25} />
    </div>
  </header>
);

export default Header;
