import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";
import { User } from "@/services/types";
import { getUserByEmail, createUser } from "@/services/user.service";

const useCheckIfUserLogin = (): User | null | undefined => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          const userExists = await getUserByEmail(authUser.email!);
          if (userExists && Object.keys(userExists).length !== 0) {
            // Ensure finishedProjects is always an array
            if (!Array.isArray(userExists.finishedProjects)) {
              userExists.finishedProjects = [];
            }
            setUser(userExists as User);
          } else {
            const userObject: User = {
              name: authUser.displayName!,
              email: authUser.email!,
              profilePicture: authUser.photoURL || "",
              externalHours: 0,
              internalHours: 0,
              projectsActives: [],
              finishedProjects: [],
              projectFavorites: [],
              isAdmin: false,
              isTutor: false,
              __v: 0,
              _id: "",
            };

            if (userObject.email.endsWith("@uca.edu.sv")) {
              localStorage.setItem("user", JSON.stringify(userObject));
              localStorage.setItem("isLoggedIn", "true");
              setUser(userObject);
              await createUser(userObject);
            } else {
              localStorage.removeItem("user");
              setUser(null);
            }
          }
        } catch (error) {
          console.error("ERROR CHECKING USER", error);
          setUser(null);
        }
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export default useCheckIfUserLogin;
