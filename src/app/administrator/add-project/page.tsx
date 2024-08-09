"use client"
import AddProject from "../../../components/addProject";

const PageAddProject: React.FC = () => {
    return (
      <div className="w-full">
          <div>
            <h2 className="text-center text-3xl my-10">Agregar proyectos</h2>
          </div>
          <AddProject />
        </div>
    );  
  };
  
  export default PageAddProject;