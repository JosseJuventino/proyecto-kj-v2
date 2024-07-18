import useCheckIfUserLogin from "@/services/checkLogin";

export const ProfileName: React.FC = () => {
    const user = useCheckIfUserLogin();
    function CapitalizarLetras(nombre: string) {
        return nombre
        .toLowerCase()
        .replace(/\b\w/g, (letra) => letra.toUpperCase());
    }

    function cutName(completeName: string) {
        const partesNombre = completeName.split(" ");

        const primerNombre = partesNombre[0];
        const primerApellido =
        partesNombre.length > 1 ? partesNombre[partesNombre.length - 2] : "";
        const nombreDepurado = CapitalizarLetras(
        primerNombre + " " + primerApellido
        );
        return nombreDepurado;
    }
    return (
        <>
      {user ? (
        <div className="flex flex-col justify-center items-center">
          <figure className="w-[130px] flex flex-row justify-center items-center">
            <img
              className="object-cover rounded-full border-black-custom w-full border-8"
              src={user.profilePicture}
              alt="ProfileUser"
              referrerPolicy="no-referrer"
            />
          </figure>
          <h2 className="text-2xl">{cutName(user.name)}</h2>
          <h3 className="text-xl text-gray-400">
            {user.email.replace(/@uca\.edu\.sv$/, "")}
          </h3>
        </div>
      ) : (
        <p>No deberias estar acá</p>
      )}
    </>
    );
}