import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useCheckIfUserLogin from "@/services/checkLogin";
import { auth } from "@/services/firebase";
import { User } from "@/services/types";
import { cutName } from "@/utils/formatName";
import LinksMenu from "./Buttons/LinksMenu";

interface MenuAdminProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const MenuAdmin: React.FC<MenuAdminProps> = ({ isOpen, toggleSidebar }) => {
  const user = useCheckIfUserLogin() as User | null;
  const router = useRouter();

  if (user === null) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const userName = user ? cutName(user.name) : "";

  return (
    <>
      <div className="lg:hidden flex justify-start p-4 text-white bg-gray-900">
          <i className="fa fa-bars cursor-pointer text-white text-xl"onClick={toggleSidebar}></i>
      </div>
      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col items-center justify-between w-full lg:w-80 p-6 bg-gray-900 transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:relative`}>
        <div className="w-full">
          <button className="lg:hidden mb-4 text-white" onClick={toggleSidebar}>
            <i className="fa fa-times"></i>
          </button>
          <Link href="/administrator/add-project" className="flex items-center p-4 text-white transition duration-500 rounded-md hover:bg-gray-700">
            <img className="w-6 mr-3" src="/images/logo_uca_blanco.png" alt="logo_uca" />
            <span className="text-sm lg:text-lg hidden lg:inline">Nuevo proyecto</span>
            <i className="ml-auto text-sm lg:text-lg fa-solid fa-pen-to-square"></i>
          </Link>
        </div>
        <nav className="w-full">
          <LinksMenu text="Inicio" icon="fa-solid fa-house" link="inicio" />
          <LinksMenu text="Proyectos" icon="fa-solid fa-chart-simple" link="/administrator/projects" isCssIcon={false} />
          <LinksMenu text="Inscripciones" link="/administrator/inscription" icon="fa-solid fa-users" />
          <LinksMenu text="Vista de usuario" link="/dashboard" icon="fa-solid fa-eye" />
        </nav>
        <div className="w-full mt-8">
          <div className="flex items-center p-4 text-white bg-gray-800 rounded-lg shadow-lg">
            <img className="w-10 h-10 rounded-full" src={user?.profilePicture || "/images/user_default.jpeg"} alt="User Photo" />
            <div className="ml-4 flex flex-col justify-center">
              <h2 className="text-sm lg:text-lg font-semibold">{userName}</h2>
              <button onClick={handleLogout} className="flex items-center text-xs lg:text-sm text-red-500 hover:underline">
                <i className="mr-1 fa-solid fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MenuAdmin;
