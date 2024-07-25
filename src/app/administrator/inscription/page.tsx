"use client"
import { useEffect, useState } from "react";
import { getInscriptions } from "@/services/inscription.service";
import { Inscription } from "@/services/types";
import TableProject from "@/components/Tables/TableProject";

const Inscriptions: React.FC = () => {

    const [inscriptions, setInscriptions] = useState<Inscription[]>([]);

  const getData = async () => {
    try {
      const fetchedInscriptions = await getInscriptions();
      setInscriptions(fetchedInscriptions);
      console.log(fetchedInscriptions);
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
      <div className="bg-white rounded-xl p-8 pt-4">
        <div>
          <h1 className="mr-auto my-5 p-0 text-3xl">Inscripciones</h1>
        </div>
        <div className="w-full">
          <TableProject
            header={header}
            rows={inscriptions.map((inscription) => [
              inscription.userName,
              inscription.projectName,
              inscription.emailUser,
              inscription.status,
              inscription._id,
            ])}
          />
        </div>
      </div>
    </div>
  );
}

export default Inscriptions;
