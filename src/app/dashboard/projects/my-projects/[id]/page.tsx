"use client";

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import InfoProyect from '@/components/InfoProject';
import ButtonWithIcon from '@/components/Buttons/ButtonWithIcon';
import Loader from '@/components/Loader';

const ProjectDetail: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [projectId, setProjectId] = useState<string | null>(null);

  useEffect(() => {
    const id = params.id;
    console.log('ID from params:', id);
    if (id) {
      if (Array.isArray(id)) {
        setProjectId(id[0]); // Assign the first element if it's an array
      } else {
        setProjectId(id);
      }
    }
  }, [params]);

  if (!projectId) {
    return <Loader />;
  }

  return (
    <>
      <div className="pt-4 lg:pl-20 bg-background-primary">
        <div className="pl-4 lg:pl-0">
          <ButtonWithIcon
            text={"Volver"}
            link="/dashboard"
            icon={"fa-solid fa-arrow-left"}
          />
        </div>
        <InfoProyect info={projectId} />
      </div>
    </>
  );
}

export default ProjectDetail;
