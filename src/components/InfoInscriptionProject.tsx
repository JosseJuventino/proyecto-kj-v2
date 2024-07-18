"use client";
import React, { useState, useEffect } from "react";
import { IconAndTitle } from "./IconAndTitle";
import { TitleDescription } from "./title_description";
import { ButtonInscribe } from "./Buttons/ButtonInscribe";
import { getProjectById } from "@/services/project.service";
import { getAllCareers } from "@/services/career.service";
import useCheckIfUserLogin from "@/services/checkLogin";
import { createInscription } from "@/services/inscription.service";
import { Project, Career, User } from "@/services/types";
import Skeleton from "react-loading-skeleton";

interface InfoInscriptionProjectProps {
  idProjectInfo: string;
}

const InfoInscriptionProject: React.FC<InfoInscriptionProjectProps> = ({ idProjectInfo }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isModalOpenAccept, setIsModalOpenAccept] = useState(false);
  const [carrersFiltered, setCarrersFiltered] = useState<{ name: string; colorTag: string }[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const user = useCheckIfUserLogin() as User | null;

  async function fetchData() {
    try {
      const projectSearched: Project = await getProjectById(idProjectInfo);
      setProject(projectSearched);
      const careersData: Career[] = await getAllCareers();
      if (careersData.length > 0) {
        const careersFetched = careersData.filter(career => 
          projectSearched.careers.includes(career.name)
        ).map(career => ({
          name: career.name,
          colorTag: career.colorTag || '#000000', // Proporcionar un color por defecto si colorTag es undefined
        }));
        setCarrersFiltered(careersFetched);
      }
    } catch (error: any) {
      console.error("Error al obtener el proyecto:", error.message);
      setProject(null); // Manejo de error si el proyecto no se encuentra
    }
  }

  function showModalAccept() {
    setIsModalOpen(true);
  }

  async function validatingModal() {
    if (checked && user && project) {
      setIsModalOpenAccept(true);
      const currentDate = new Date();
      const currentHour = currentDate.getHours().toString().padStart(2, '0');
      const currentMinute = currentDate.getMinutes().toString().padStart(2, '0');
      const currentHourString = `${currentHour}:${currentMinute}`;

      try {
        const inscriptionObj = {
          emailUser: user.email,
          idProject: project._id,
          inscriptionHour: currentHourString,
          userName: user.name,
          projectName: project.title,
          status: "pendiente",
        };
        const inscription = await createInscription(inscriptionObj);
        console.log(inscription);
      } catch (error: any) {
        console.error("Error al crear la inscripcion:", error.message);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [idProjectInfo]);

  return (
    <div className="flex flex-col px-5 justify-between py-8 lg:flex-row">
      <figure className="object-cover w-full lg:w-1/2 lg:mb-4 lg:pr-5">
        {!imageLoaded && (
          <div className="w-full h-[300px] bg-gray-200 animate-pulse">
            <Skeleton height={300} />
          </div>
        )}
        <img
          className={`w-full h-full  object-cover rounded-lg shadow-lg ${imageLoaded ? 'block' : 'hidden'}`}
          src={project?.image}
          alt="imagen Proyecto"
          onLoad={() => setImageLoaded(true)}
        />
      </figure>

      {isModalOpen && (
        <div className="fixed text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-lg lg:w-[40%] w-[70%]">
          {isModalOpenAccept ? (
            <div className="flex flex-col justify-center items-center relative">
              <div className="absolute -top-3 right-0">
                <i
                  onClick={() => setIsModalOpen(false)}
                  className="fas fa-times text-3xl cursor-pointer"
                ></i>
              </div>
              <img src="/images/Envelope.gif" className="w-36" alt="" />
              <p className="text-2xl mt-5">Solicitud enviada con éxito</p>
              <p className="text-md">Pronto se pondrán en contacto contigo</p>
            </div>
          ) : (
            <div>
              <div className="absolute -top-0 right-2">
                <i
                  onClick={() => setIsModalOpen(false)}
                  className="fas fa-times text-3xl cursor-pointer"
                ></i>
              </div>
              <h2 className="text-xl mb-2">
                ¿Quieres enviar una solicitud de inscripción a este proyecto?
              </h2>
              <div>
                <input
                  type="checkbox"
                  onChange={() => setChecked(!checked)}
                  name="acepto"
                  id="acepto"
                />
                <label htmlFor="acepto" className="ml-2">
                  Acepto cumplir con la responsabilidad que esto conlleva
                </label>
              </div>
              <ButtonInscribe link="" eventClick={validatingModal} text="Acepto" />
            </div>
          )}
        </div>
      )}

      <div className="px-4">
        {project && (
          <>
            <TitleDescription
              titulo={project.title}
              hasTag={true}
              tags={carrersFiltered}
              description={project.description}
            />
            <div>
              <IconAndTitle
                icon="fa-solid fa-location-dot"
                title="Lugar:"
                description={project.place}
              />
              <IconAndTitle
                icon="fa-solid fa-clock"
                title="Servicio Social:"
                description={project.socialService}
              />
              <IconAndTitle
                icon="fa-solid fa-house-user"
                title="Modalidad:"
                description={project.modality}
              />
              <IconAndTitle
                icon="fa-solid fa-calendar"
                title="Horario:"
                description={project.schedule}
              />
              <IconAndTitle
                icon="fa-solid fa-circle-info"
                title="Más información:"
                description={project.moreInformation}
              />
            </div>
          </>
        )}
        <ButtonInscribe eventClick={showModalAccept} text="Inscribirse" link="" />
      </div>
    </div>
  );
};

export default InfoInscriptionProject;
