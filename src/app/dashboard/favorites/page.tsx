"use client";

import React, { useEffect, useState } from "react";
import useCheckIfUserLogin from "@/services/checkLogin";
import { CardContainer } from "@/components/Card/CardContainer";
import { getProjectById } from "@/services/project.service";
import CommonButton from "@/components/Buttons/CommonButton";
import { Project, User } from "@/services/types";

const Favorites: React.FC = () => {
    const user = useCheckIfUserLogin() as User | null;
    const [projectsFav, setProjectsFav] = useState < Project[] > ([]);

    useEffect(() => {
        const fetchProjects = async () => {
            if (user) {
                const favoritosUid = user.projectFavorites;

                if (favoritosUid) {
                    try {
                        const projects = await Promise.all(
                            favoritosUid.map((id) => getProjectById(id!))
                        );
                        setProjectsFav(projects.filter((project) => project !== null) as Project[]);
                    } catch (error) {
                        console.error("Error fetching projects:", error);
                        setProjectsFav([]);
                    }
                } else {
                    setProjectsFav([]);
                }
            }
        };

        fetchProjects();
    }, [user]);

    return (
        <div className="bg-background-primary">
            {projectsFav.length > 0 ? (
                <div>
                    <h1 className="text-center text-3xl">Mis favoritos</h1>
                    <CardContainer
                        text=""
                        hasButton={false}
                        type="active"
                        projectsActives={projectsFav}
                        needMorePage={false}
                        textNotSearch=""
                    />
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center">
                    <img className="w-52" src="/images/buhoBrokenHeart.png" alt="buhoBrokenHeart" />
                    <h2 className="text-center text-2xl mt-10 mx-28">
                        Oops, parece que nuestro búho social está sintiendo la soledad. 🦉
                        ¡Vamos a llenar su corazón de proyectos que marquen la diferencia!
                    </h2>
                    <CommonButton link="/dashboard/projects" text="Explorar proyectos" />
                </div>
            )}
        </div>
    );
};

export default Favorites;
