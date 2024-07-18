import { ResumeCircles } from "./ResumeCircles";
import { ProfileName } from "./ProfileName";
import useCheckIfUserLogin from "@/services/checkLogin";
import React from "react";

export const Resume: React.FC = () => {
    const user = useCheckIfUserLogin();
    return (
        <>
      <div className="flex flex-row justify-center">
        {user ? (
          <div className="container mt-10 flex flex-col md:flex-row justify-around items-center">
            <ProfileName />
            <div className="flex items-center flex-row text-center">
              <ResumeCircles hours={user.internalHours} text="Horas internas" />
              <ResumeCircles hours={user.externalHours} text="Horas externas" />
            </div>
          </div>
        ) : (
          <p>No deberias estar acá</p>
        )}
      </div>
    </>      
    );
}