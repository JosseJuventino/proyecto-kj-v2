import React, { useState } from 'react';
import logo_uca from '/public/images/logo_uca.png';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { useRouter } from 'next/navigation';
import { getUserByEmail } from '@/services/user.service';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  // Variables para el login con Google
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

  async function handleLoginGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      if (user) {
        if (user.email?.endsWith("@uca.edu.sv")) {
          const usuarioMongo = await getUserByEmail(user.email);
          if (usuarioMongo) {
            if (usuarioMongo.isAdmin) {
              router.push("/administrator/dashboard/inicio");
            } else {
              router.push("/dashboard");
            }
          } else {
            console.error("Usuario no encontrado en la base de datos.");
          }
        } else {
          setShowErrorEmail(true);
          router.push("/login");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className="flex flex-col items-center h-screen">
      <div className="flex flex-col items-center text-center headerForm">
        <figure className="w-[60%] mt-5">
          <img className="object-cover" src={logo_uca.src} alt="Logo UCA" />
        </figure>
        <h2 className="mt-5 text-4xl">¡Bienvenido!</h2>
        <h3 className="text-2xl">Inicio de sesión</h3>
      </div>
      <div className="flex flex-col items-center mt-10 formContent">
        <div className="cuentasUca">
          <p className="mb-5">Inicia sesión usando tu cuenta:</p>
          <div onClick={handleLoginGoogle}>
            <ButtonWithIcon
              text="Google Cuentas UCA"
              icon="fa-brands fa-google"
              link="#"
            />
          </div>
        </div>
      </div>
      <div className={showErrorEmail ? "flex justify-center absolute" : "hidden"}>
        <div className="bg-gray-900 p-5 flex flex-col justify-center">
          <h2 className="text-white">
            Solo puedes iniciar sesión con correo institucional UCA
          </h2>
          <button className="">Aceptar</button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
