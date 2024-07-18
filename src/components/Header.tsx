"use client";

import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import ButtonHeader from './Buttons/ButtonHeader';
import useCheckIfUserLogin from '@/services/checkLogin';
import { cutName } from '@/utils/formatName';
import NavLinks from './NavLinks';
import { User } from '@/services/types';
import Loader from './Loader';

const Header: React.FC = () => {
  const [modal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const user: User | null | undefined = useCheckIfUserLogin();

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  const toggleModal = () => setShowModal(!modal);

  const renderLoginButton = () => {
    const buttonProps = {
      image: user ? user.profilePicture : "images/user_default.jpeg",
      className: `mx-2 ${modal ? 'my-10' : ''}`,
      text: user ? cutName(user.name) : 'Iniciar Sesión',
      referrerPolicy: 'no-referrer' as React.HTMLAttributeReferrerPolicy,
    };

    return <ButtonHeader {...buttonProps} />;
  };

  if (user === undefined) {
    return <Loader />;
  }

  return (
    <>
      <nav className="flex flex-row justify-between items-center py-5 px-10 text-lg sticky top-0 left-0 bg-background-primary z-30">
        <div className="flex flex-row justify-evenly items-center">
          <figure className="w-20">
                <img src="/images/logo_uca.png" alt="logo_uca" />
          </figure>
          <div className="hidden md:block">
            <NavLinks user={user} modal={modal} />
          </div>
        </div>

        <div className="hidden md:block">{renderLoginButton()}</div>

        <div className="md:hidden">
          {modal ? (
            <div></div>
          ) : (
            <FaBars className="text-3xl cursor-pointer" onClick={toggleModal} />
          )}
        </div>
      </nav>
      <div
        className={`${
          modal
            ? 'flex fixed top-0 left-0 w-full flex-col h-full z-50 slide-from-right-enter'
            : 'hidden slide-from-right-leave'
        } justify-center items-center bg-hover-black-custom py-9`}
      >
        <NavLinks user={user} modal={modal} />
        <div className="mt-10">{renderLoginButton()}</div>
        <IoClose className="text-4xl mt-12" onClick={toggleModal} />
      </div>
    </>
  );
};

export default Header;
