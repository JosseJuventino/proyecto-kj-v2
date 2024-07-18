import CommonButton from "@/components/Buttons/CommonButton";
export const NotLogged: React.FC = () => {
    return (
    <div className="flex flex-col -mt-14 justify-center items-center h-screen bg-background-primary">
      <img src="/images/buho-policia.png" className="w-60" alt="buho Policia UCA" />
      <h2 className="text-center text-2xl mt-10">
        ¡Ops! Parece que nuestro búho está protegiendo esta página. <br /> 😮
        Inicia sesión para desbloquear el acceso y explorar más.
      </h2>

      <CommonButton text={"¡Inicia sesión y explora!"} link={"/login"} />
    </div>
  );
}