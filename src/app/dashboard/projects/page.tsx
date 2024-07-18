"use client";
import React, { useEffect, useState } from "react";
import { InputSearch } from "@/components/Inputs/InputSearch";
import Dropdown from "@/components/Inputs/Dropdown";
import { CardContainer } from "@/components/Card/CardContainer";
import { getAllCareers } from "@/services/career.service";
import { getAllProjects } from "@/services/project.service";
import CommonButton from "@/components/Buttons/CommonButton";
import useCheckIfUserLogin from "@/services/checkLogin";// Asegúrate de que la ruta sea correcta
import { Career, Project } from "@/services/types";
import Loader from "@/components/Loader";

export default function Projects() {
    const [projectActive, setProjectActive] = useState<Project[]>([]);
    const [parsedProjects, setParsedProjects] = useState<Project[]>([]);
    const [careers, setCareers] = useState<Career[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Estado de carga
    const user = useCheckIfUserLogin();

    useEffect(() => {
        const loadData = async () => {
            setLoading(true); // Iniciar carga
            const proyectos = await getAllProjects();
            const carrersData: Career[] = await getAllCareers();

            const transformedCareers = carrersData.map((career) => ({
                ...career,
                name: career.name
                    .replace("Ingeniería", "Ing.")
                    .replace("Licenciatura", "Lic.")
                    .replace("Profesorado", "Prof.")
                    .replace("Tecnico", "Prof."),
            }));

            setParsedProjects(proyectos);
            setProjectActive(proyectos);
            setCareers(transformedCareers);
            setLoading(false); // Terminar carga
        };

        loadData();
    }, []);

    useEffect(() => {
        if (user !== null) {
            setLoading(false);
        }
    }, [user]);

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        let projectsSimilar: Project[] = [];
        parsedProjects.forEach((project) => {
            if (project.title.toLowerCase().includes(evt.target.value.toLowerCase())) {
                projectsSimilar.push(project);
            }
        });

        if (evt.target.value === "" || projectsSimilar.length === 0) {
            setProjectActive(parsedProjects);
        } else {
            setProjectActive(projectsSimilar);
        }
    }

    function handleChangeCareer(evt: React.ChangeEvent<HTMLSelectElement>) {
        if (evt.target.value === "") {
            setProjectActive(parsedProjects);
        } else {
            let projectsSimilar: Project[] = [];
            parsedProjects.forEach((project) => {
                project.careers.forEach((career) => {
                    if (career === evt.target.value) {
                        projectsSimilar.push(project);
                    }
                });
            });
            setProjectActive(projectsSimilar);
        }
    }

    function handleChangeModality(evt: React.ChangeEvent<HTMLSelectElement>) {
        if (evt.target.value === "") {
            setProjectActive(parsedProjects);
        } else {
            let projectsSimilar: Project[] = [];
            parsedProjects.forEach((project) => {
                if (project.socialService === evt.target.value) {
                    projectsSimilar.push(project);
                }
            });
            setProjectActive(projectsSimilar);
        }
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <main className="bg-background-primary">
            <h1 className=" text-3xl text-center">Proyectos</h1>
            <div className="flex flex-col mx-10 mt-10 lg:mx-44">
                <InputSearch
                    changeFunction={handleChange}
                    placeholder={"Busca proyectos sociales acá"}
                    title=""
                />
                <div className="flex flex-col justify-center w-full mt-5 lg:flex-row lg:justify-around">
                    <Dropdown eventHandler={handleChangeCareer} optionsToShow={{
                        title: "Carrera",
                        options: careers.map((career) => career.name),
                    }} />
                    <Dropdown optionsToShow={{
                        title: "Modalidad",
                        options: ["Interno", "Externo"],
                    }} eventHandler={handleChangeModality} />
                </div>
                <div className="container mx-auto mt-4">
                    {user && user.isTutor ? (
                        ""
                    ) : (
                        <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
                            <div className="flex flex-col sm:flex-row">
                                <div className="w-full sm:w-1/2">
                                    <img
                                        src="/images/circulosEstudio.jpg"
                                        alt="circulosEstudio"
                                        className="w-full min-h-full object-cover"
                                    />
                                </div>
                                <div className="w-full sm:w-1/2 p-4">
                                    <h2 className="text-lg font-bold">¡Conviértete en tutor!</h2>
                                    <p className="mt-3 text-sm">
                                        ¡Sé un guía en el camino del conocimiento! Conviértete en tutor y comparte tu experiencia para inspirar a otros. ¡Regístrate ahora y marca la diferencia en la educación! 🚀
                                    </p>
                                    <CommonButton link="/inscription-ce" text="Regístrate" icon="fas fa-user-plus" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <CardContainer
                text=""
                hasButton={false}
                projectsActives={projectActive}
                needMorePage={false}
                textNotSearch="No se encontraron proyectos"
                type=""
            />
        </main>
    );
}
