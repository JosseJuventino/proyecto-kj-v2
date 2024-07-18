// src/components/general/ButtonHeader.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/services/firebase';
import useCheckIfUserLogin from '@/services/checkLogin';
import Link from 'next/link';
import { StaticImageData } from 'next/image';

interface ButtonHeaderProps {
  text: string;
  image: string | StaticImageData;
}

const ButtonHeader: React.FC<ButtonHeaderProps> = ({ text, image }) => {
  const user = useCheckIfUserLogin();
  const router = useRouter();
  const [closeSession, setCloseSession] = useState(false);

  function handleLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('isLogged');
    signOut(auth);
    router.push('/login');
  }

  return (
    <div className="relative">
      <div onClick={() => setCloseSession(!closeSession)}>
        <Link href={user ? "#" : "/login"} className="flex flex-row border-transparent border-4 transition-colors duration-500 ease-in-out justify-between items-center bg-black-custom text-white px-6 py-2 rounded-full hover:bg-hover-black-custom hover:text-black hover:border-black-custom hover:border-4" passHref>
          <figure className="w-10">
            <img
              className="rounded-full object-cover"
              src={typeof image === 'string' ? image : image.src}
              alt="user_image"
            />
          </figure>
          <span className="mx-2">
            {text}{' '}
            {user ? (
              <i
                className={`fa-solid fa-chevron-${
                  closeSession ? 'up' : 'down'
                }`}
              ></i>
            ) : null}
          </span>
        </Link>
      </div>
      {closeSession && user && (
        <div className="absolute mt-3 text-center w-full">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-red-900 py-2 px-4 rounded-xl hover:bg-red-600 hover:text-white transition-colors duration-500"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default ButtonHeader;
