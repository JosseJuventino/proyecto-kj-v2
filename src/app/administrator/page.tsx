"use client"
import { useEffect, useState } from "react";
import TableProject from "@/components/Tables/TableProject";
import Count from "@/components/Card/CountCard";
import { getInscriptions } from "@/services/inscription.service";
import { Inscription } from "@/services/types";

const HomeAdmin: React.FC = () => {
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);

  const getData = async () => {
    try {
      const fetchedInscriptions = await getInscriptions();
      setInscriptions(fetchedInscriptions);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const header = ["Estudiante", "Proyecto", "Correo", "Estado"];

  return (
    <div>
      <div>
        <h1 className="mt-10 mx-5 text-4xl font-bold my-8">Inicio</h1>
        <div className="mb-10">
          <Count />
        </div>
      </div>
      <div className="bg-white rounded-xl p-8">
        <div>
          <h1 className="mr-auto my-5 text-3xl">Ultimas Inscripciones</h1>
        </div>
        <div className="w-full">
          <TableProject
            header={header}
            rows={inscriptions.map((inscription) => [
              inscription.userName,
              inscription.projectName,
              inscription.emailUser,
              inscription.status,
            ])}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
