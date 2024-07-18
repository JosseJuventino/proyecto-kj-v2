"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import { NotLogged } from "../not-logged/page";
import useCheckIfUserLogin from "@/services/checkLogin";

interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const user = useCheckIfUserLogin();

  useEffect(() => {
    // Check if user login status is available
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

  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default RootLayout;
