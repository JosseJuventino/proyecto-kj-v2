"use client";
import React, { useEffect, useState } from "react";
import { Tag } from "./Tag";
import useCheckIfUserLogin from "@/services/checkLogin";
import { updateUser, getUserByEmail } from "@/services/user.service";
import { getAllCareers } from "@/services/career.service";
import { Career, Project, User } from "@/services/types";
import { useRouter } from "next/navigation";

interface CardProps {
  project: Project;
  isClickeable: boolean;
  haveButtonHeart: boolean;
}

export const Card: React.FC<CardProps> = ({ project, isClickeable = true, haveButtonHeart = true }) => {
  const user = useCheckIfUserLogin() as User | null;
  const router = useRouter();

  const [clickedFavorite, setClickedFavorite] = useState(false);
  const [popAnimation, setPopAnimation] = useState(false);
  const [isInscription, setIsInscription] = useState(false);
  const [careers, setCareers] = useState<Career[]>([]);

  async function fetchCareers() {
    try {
      const careersData = await getAllCareers();
      if (careersData.length > 0) {
        const careersFetched = careersData.filter(career => 
          project.careers.includes(career.name)
        ).map(career => ({
          ...career,
          name: career.name
            .replace(/Ingeniería/g, 'Ing.')
            .replace(/Licenciatura/g, 'Lic.')
            .replace(/Profesorado/g, 'Prof.')
            .replace(/Técnico/g, 'Tec.')
        }));
        setCareers(careersFetched);
      }
    } catch (error) {
      console.error("Error al obtener carreras", error);
    }
  }

  useEffect(() => {
    if (user) {
      const favoritosUid = user.projectFavorites;

      if (favoritosUid.includes(project._id)) {
        setClickedFavorite(true);
      }

      const isProjectActive = user.projectsActives.includes(project._id);
      const isProjectFinished = user.finishedProjects.some(
        (finishedProject) => finishedProject.idProject === project._id
      );

      if (isProjectActive || isProjectFinished) {
        setIsInscription(true);
      }

      fetchCareers();
    }
  }, [project._id, user, project, project.careers]);

  const handleCardClick = () => {
    if (isClickeable) {
      if (isInscription) {
        router.push(`/dashboard/projects/my-projects/${project._id}`);
      } else {
        router.push(`/dashboard/projects/inscription-project/${project._id}`);
      }
    }
  };

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setPopAnimation(true);

    try {
      let usuario = await getUserByEmail(user!.email);

      if (usuario) {
        const updatedFavoritos = [...usuario.projectFavorites];
        const index = updatedFavoritos.indexOf(project._id);

        if (index !== -1) {
          updatedFavoritos.splice(index, 1);
        } else {
          updatedFavoritos.push(project._id);
        }

        await updateUser(usuario.email, {
          projectFavorites: updatedFavoritos,
        });

        setClickedFavorite((prevClickedFav) => !prevClickedFav);

        setTimeout(() => {
          setPopAnimation(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Error al actualizar favoritos", error);
    }
  }

  return (
    <>
      {project ? (
        <div
          onClick={handleCardClick}
          className="relative flex flex-col items-start mt-5 w-[300px] overflow-hidden bg-white rounded-lg cursor-pointer card"
        >
          <div className="absolute top-0 m-2">
            {haveButtonHeart && (
              <button
                onClick={handleClick}
                className={`bg-white p-2 px-3 rounded-full box-border `}
              >
                <p className={`text-xl ${popAnimation ? "pop-animation" : ""}`}>
                  <i
                    className={
                      clickedFavorite
                        ? "fa-solid fa-heart text-red-500"
                        : "fa-regular fa-heart "
                    }
                  ></i>
                </p>
              </button>
            )}
          </div>
          <figure className="h-[200px] w-full object-cover overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={project.image}
              alt="Imagen de proyecto"
            />
          </figure>

          <div className="flex flex-row items-end mt-4">
            <div className="absolute px-8 py-1 text-sm text-white bg-red-500 rounded-full type right-4">
              <p>{project.socialService}</p>
            </div>
          </div>

          <div className="p-5 Information">
            <div className="flex flex-row flex-wrap gap-1 tags">
              {careers && careers.map((tag, index) => (
                <Tag key={`${tag.name}_${index}`} name={tag.name} background={tag.colorTag} />
              ))}
            </div>
            <h3 className="my-4 w- break-words text-xl lg:text-2xl">{project.title}</h3>
            <p>Modalidad: {project.modality}</p>
            <p className="mt-2 text-gray-400">
              <i className="fa-solid fa-location-dot"></i> {project.place}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
