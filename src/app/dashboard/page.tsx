"use client";
import { Resume } from "@/components/Resume";
import { CardContainer } from "@/components/Card/CardContainer";
import useCheckIfUserLogin from "@/services/checkLogin";
import { useEffect, useState } from "react";
import { Project } from "@/services/types";
import { NotLogged } from "../not-logged/page";
import { getAllProjects } from "@/services/project.service";

export default function HomePage() {
  const user = useCheckIfUserLogin();

  const [projectActive, setProjectActive] = useState<Project[]>([]);
  const [projectFinished, setProjectFinished] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (user) {
        const allProjects = await getAllProjects();

        const uidProjectsActivos = user.projectsActives;
        const uidProjectsFinalizados = user.finishedProjects.map(
          (project) => project.idProject
        );

        const projectsActiveFiltered = allProjects.filter((project: Project) =>
          uidProjectsActivos.includes(project._id)
        );
        const projectsFinishedFiltered = allProjects.filter((project: Project) =>
          uidProjectsFinalizados.includes(project._id)
        );

        setProjectActive(projectsActiveFiltered);
        setProjectFinished(projectsFinishedFiltered);
      }
    };

    fetchProjects();
  }, [user]);

  return (
    <>
      {user ? (
        <div className="font-primary bg-background-primary">
          <Resume />
          <div>
            <CardContainer
              text="Proyectos activos"
              hasButton={true}
              type="active"
              projectsActives={projectActive}
              needMorePage={projectActive.length > 4}
              textNotSearch="No se encontraron proyectos activos"
            />
            <CardContainer
              text="Proyectos finalizados"
              hasButton={true}
              type="finished"
              projectsActives={projectFinished}
              needMorePage={projectFinished.length > 4}
              textNotSearch="No se encontraron proyectos finalizados"
            />
          </div>
        </div>
      ) : (
        <NotLogged />
      )}
    </>
  );
}
