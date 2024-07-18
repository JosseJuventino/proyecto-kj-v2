"use client";

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import InfoInscriptionProject from "@/components/InfoInscriptionProject";
import ButtonWithIcon from '@/components/Buttons/ButtonWithIcon';
import Loader from '@/components/Loader';

const InscriptionProjectPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [projectId, setProjectId] = useState<string | null>(null);

  useEffect(() => {
    const id = params.id;
    console.log('ID from params:', id);
    if (id) {
      if (Array.isArray(id)) {
        setProjectId(id[0]); // Asigna el primer elemento si es un array
      } else {
        setProjectId(id);
      }
    }
  }, [params]);

  if (!projectId) {
    return <Loader />;
  }

  const handleNavigate = () => {
    router.push("/dashboard/projects");
  };

  return (
    <div className="pt-6 mb-0 lg:pl-20 bg-background-primary">
      <div
        className="pl-4 lg:pl-0"
        onClick={handleNavigate}
      >
        <ButtonWithIcon link='' text={"Volver"} icon={"fa-solid fa-arrow-left"} />
      </div>
      <InfoInscriptionProject idProjectInfo={projectId} />
    </div>
  );
};

export default InscriptionProjectPage;
