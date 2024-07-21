"use client";

import React, { useState, useEffect } from "react";
import MenuAdmin from "@/components/MenuAdmin";
import Loader from "@/components/Loader";
import { NotLogged } from "../not-logged/page";
import useCheckIfUserLogin from "@/services/checkLogin";
import { User } from "@/services/types";

interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const user = useCheckIfUserLogin() as User | null;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <NotLogged />;
  }

  if (!user.isAdmin) {
    return <div>No tienes permiso para acceder a esta sección.</div>;
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main className="flex h-screen overflow-hidden">
      <MenuAdmin isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <section className={`flex-1 transition-transform ${isOpen ? "transform translate-x-full" : ""}  p-4 overflow-y-auto`}>
        {children}
      </section>
    </main>
  );
};

export default RootLayout;
