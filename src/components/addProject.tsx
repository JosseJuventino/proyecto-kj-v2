import React, { useEffect, useState, ChangeEvent } from "react";
import InputComponent from "./Inputs/InputComponent";
import ButtonAdd from "./Buttons/ButtonAdd";
import { Card } from "../components/Card/Card";
import { getAllCareers } from "../services/career.service";
import { storage } from "../services/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { createProject, getProjectByName, updateProject } from "../services/project.service";
import { Project, Career } from "../services/types"; // Asegúrate de importar correctamente las interfaces

function AddProject() {
  const [projectByName, setProjectByName] = useState<string | null>(null);
  const projectName = localStorage.getItem("projectName");
  const [projectData, setProjectData] = useState<Project>({
    _id: '',
    title: 'No name project',
    careers: [],
    shedule: "",
    socialService: "Interno",
    modality: 'Presencial',
    place: 'Default location',
    description: '',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png',
    moreInformation: "",
    status: "active",
  });

  const [careers, setCareers] = useState<Career[]>([]);
  const [image, setImage] = useState<File | null>(null);

  async function fetchProjectByName() {
    try {
      setProjectByName(localStorage.getItem("projectName"));
      if (projectName) {
        const projectData = await getProjectByName(projectName);
        setProjectData({
          ...projectData,
          shedule: "",
          status: "active",
        });
        localStorage.removeItem("projectName");
      }
    } catch (error) {
      console.error("Error fetching project by name:", error);
    }
  }

  useEffect(() => {
    if (projectName) {
      fetchProjectByName();
    }
  }, [projectName]);

  async function fetchCareers() { 
    const careersData = await getAllCareers();
    const transformedCareers = careersData.map((career: Career) => ({
      ...career,
      name: career.name
        .replace("Ingeniería", "Ing.")
        .replace("Licenciatura", "Lic.")
        .replace("Profesorado", "Prof.")
        .replace("Tecnico", "Prof."),
    }));
    setCareers(transformedCareers);
  }

  const handleAddProjectMongo = async () => {
    try {
      const response = await createProject(projectData);
      console.log('Project added successfully:', response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddProject = async () => {
    if (image) {
      const uniqueString = Math.random().toString(36).substring(2, 15);
      const fileExtension = image.name.split('.').pop();
      const randomFileName = `${uniqueString}.${fileExtension}`;
      const storageRef = ref(storage, `projectImages/${randomFileName}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProjectData((prevProjectData) => ({
              ...prevProjectData,
              image: downloadURL,
            }));
            handleAddProjectMongo(); // Add the project after the image URL is set
          });
        }
      );
    } else {
      handleAddProjectMongo(); // If no image, add the project directly
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleRemoveCareer = (index: number) => {
    const updatedCareers = [...projectData.careers];
    updatedCareers.splice(index, 1);
    setProjectData((prevProjectData) => ({
      ...prevProjectData,
      careers: updatedCareers,
    }));
  };

  const handleSelectChange = (fieldName: keyof Project, selectedValue: string) => {
    setProjectData({
      ...projectData,
      [fieldName]: selectedValue,
    });
  };

  const handleChangeCareers = (e: ChangeEvent<HTMLSelectElement>) => {
    const careerSelected = e.target.value;

    if (projectData.careers.length < 4 && !projectData.careers.includes(careerSelected)) {
      setProjectData((prevProjectData) => ({
        ...prevProjectData,
        careers: [...prevProjectData.careers, careerSelected],
      }));
    } else {
      alert('No puedes agregar más de 4 carreras y no puedes agregar carreras repetidas');
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProjectData((prevProjectData) => ({
        ...prevProjectData,
        image: imageUrl,
      }));
      setImage(file);
    }
  };

  const handleInputChange = (fieldName: keyof Project, value: string) => {
    setProjectData({
      ...projectData,
      [fieldName]: value,
    });
  };

  return (
    <div className="text-sm flex flex-col lg:flex-row justify-between px-10 w-full">
      <div>
        <p className="mb-2 text-sm">Titulo:</p>
        <InputComponent
          value={projectData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
        />
        <div>
          <p className="mb-2 text-sm">Carrera:</p>
          <div className="flex flex-col justify-start items-start">
            <select
              id="careers"
              name="careers"
              className="rounded-full border-2 border-gray-300 bg-white p-1 mb-3 pl-2"
              value={projectData.careers[0]}
              onChange={handleChangeCareers}
            >
              {careers.map((career, index) => (
                <option value={career.name} key={index}>{career.name}</option>
              ))}
            </select>
            <div className="grid grid-cols-2 mx-2 gap-3 my-2">
              {projectData.careers.map((career, index) => (
                <div className="bg-gray-600 px-3 text-xsm py-2 my-2 text-white rounded-full -mt-3 flex flex-row justify-between items-center" key={index}>
                  <h2>{career}</h2>
                  <button
                    className="ml-2"
                    onClick={() => handleRemoveCareer(index)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="mb-2 text-sm">Horario:</p>
        <InputComponent
          value={projectData.shedule}
          onChange={(e) => handleInputChange('shedule', e.target.value)}
        />
        <div className="flex flex-row gap-2">
          <div className="flex flex-col flex-wrap">
            <p className="mb-2 text-sm">Servicio Social:</p>
            <select
              id="tipoServicio"
              name="tipoServicio"
              className="rounded-full border-2 border-gray-300 bg-white p-1 mb-3 pl-2"
              value={projectData.socialService}
              onChange={(e) => handleSelectChange('socialService', e.target.value)}
            >
              <option value="Interno">Interno</option>
              <option value="Externo">Externo</option>
            </select>
          </div>
          <div className="flex flex-col flex-wrap">
            <p className="mb-2 text-sm">Modalidad</p>
            <select
              id="modalidad"
              name="modalidad"
              className="rounded-full border-2 border-gray-300 bg-white p-1 mb-3 pl-2"
              value={projectData.modality}
              onChange={(e) => handleSelectChange('modality', e.target.value)}
            >
              <option value="Presencial">Modalidad Presencial</option>
              <option value="Virtual">Modalidad Virtual</option>
            </select>
          </div>
        </div>
        <p className="mb-2 text-sm">Lugar</p>
        <InputComponent
          value={projectData.place}
          onChange={(e) => handleInputChange('place', e.target.value)}
        />
        <p className="mb-2 text-sm">Descripción</p>
        <InputComponent
          value={projectData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
        />
        <p className="mb-2 text-sm">Más información</p>
        <InputComponent
          value={projectData.moreInformation}
          onChange={(e) => handleInputChange('moreInformation', e.target.value)}
        />
        <p className="mb-2 text-sm">Imagen</p>
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            className="border border-gray-300 py-2 px-4 rounded-lg"
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div>
        <ButtonAdd text="Agregar proyecto" eventClick={handleAddProject} />
      </div>
    </div>
  );
}

export default AddProject;
