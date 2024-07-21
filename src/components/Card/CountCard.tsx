const Count: React.FC = () => {
  return (
    <div className="flex flex-row justify-between space-x-4">
      <div className="bg-cream shadow-md p-8 text-2xl font-serif rounded-xl">
        Proyectos activos
      </div>
      <div className="bg-cream shadow-md p-8 text-2xl font-serif rounded-xl">
        Estudiantes en proyectos
      </div>
      <div className="bg-cream shadow-md p-8 text-2xl font-serif rounded-xl">
        Materias impartidas
      </div>
      <div className="bg-cream shadow-md p-8 text-2xl font-serif rounded-xl">
        Tutores
      </div>
    </div>
  );
};

export default Count;
