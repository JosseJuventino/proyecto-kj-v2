import { useEffect, useState } from "react";
import { IconAndTitle } from "./IconAndTitle";
import { TitleDescription } from "./title_description";
import useCheckIfUserLogin from "@/services/checkLogin";
import { getProjectById } from "@/services/project.service";
import { Project, User, FinishedProject } from "@/services/types";
import Skeleton from "react-loading-skeleton";
import Loader from "@/components/Loader";

interface InfoProyectProps {
  info: string;
}

const InfoProyect: React.FC<InfoProyectProps> = ({ info }) => {
  const user = useCheckIfUserLogin() as User | null;
  const [project, setProject] = useState<Project | null>(null);
  const [startDateState, setStartDate] = useState<string>("");
  const [finishedDate, setFinishedDate] = useState<string>("");
  const [imageLoaded, setImageLoaded] = useState(false);

  async function fetchProjectData() {
    try {
      const projectSearched: Project = await getProjectById(info);
      setProject(projectSearched);

      if (user) {
        user.projectsActives.forEach((activeProjectId) => {
          if (activeProjectId === projectSearched._id) {
            setStartDate(new Date().toISOString()); // Example start date
          }
        });

        user.finishedProjects.forEach((finishedProject) => {
          if (finishedProject.idProject === projectSearched._id) {
            setStartDate(finishedProject.startDate);
            setFinishedDate(finishedProject.finishedDate);
          }
        });
      }
    } catch (error: any) {
      console.error("Error al obtener el proyecto:", error.message);
      setProject(null); // Handle error if the project is not found
    }
  }

  useEffect(() => {
    fetchProjectData();
  }, [info, user]);

  if (!project) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-center py-8 lg:flex-row">
      <figure className="object-cover w-full lg:w-1/2 lg:mb-4 lg:pr-5">
        {!imageLoaded && (
          <div className="w-full h-[300px] bg-gray-200 animate-pulse">
            <Skeleton height={300} />
          </div>
        )}
        <img
          className={`w-full h-full object-cover rounded-lg shadow-lg ${imageLoaded ? 'block' : 'hidden'}`}
          src={project.image}
          alt="Imagen Proyecto"
          onLoad={() => setImageLoaded(true)}
        />
      </figure>

      <div className="px-4 lg:w-1/2">
        <div>
          <TitleDescription
            titulo={project.title}
            description={project.description}
            hasTag={false}
          />
        </div>
        <div>
          <IconAndTitle
            icon={"fa-solid fa-location-dot"}
            title={"Lugar:"}
            description={project.place}
          />
          <IconAndTitle
            icon={"fa-solid fa-clock"}
            title={"Servicio Social:"}
            description={project.socialService}
          />
          <IconAndTitle
            icon={"fa-solid fa-house-user"}
            title={"Modalidad:"}
            description={project.modality}
          />
          <IconAndTitle
            icon={"fa-solid fa-circle-info"}
            title={"Más información:"}
            description={project.moreInformation}
            />
                  
            <IconAndTitle
            icon={"fa-solid fa-play"}
            title={"Fecha de inicio:"}
            description={startDateState}
                  />
            <IconAndTitle
            icon={"fa-solid fa-stop"}
            title={"Fecha de finalización:"}
            description={finishedDate}
            />
        </div>
      </div>
    </div>
  );
};

export default InfoProyect;
