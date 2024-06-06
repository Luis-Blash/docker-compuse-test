import { useNavigate } from "react-router-dom";
import { createUsers } from "../../api";
import { publicRoutes } from "../../router/routesEndpoints";

export const Register = () => {
  const navigate = useNavigate();
  const sendRegister = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    createUsers(data).then(({ status }) => {
      if (status > 0) {
        alert("No se creo");
        return;
      }
      console.log("creado");
      navigate(`/${publicRoutes.auth}`);
    });
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center h-full gap-4">
      <div className="flex justify-center items-center">
        <h1 className="text-[50px] font-bold uppercase">Registro</h1>
      </div>
      <form onSubmit={sendRegister} className="flex flex-col gap-4">
        <input
          className=" w-[300px] rounded-full px-4 py-2"
          name="email"
          placeholder="Email"
          type="email"
          required
        />
        <input
          className=" w-[300px] rounded-full px-4 py-2"
          name="password"
          placeholder="Contraseña"
          type="password"
          pattern=".{8,}"
          title="La contraseña debe tener al menos 8 caracteres"
          required
        />
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-300 hover:bg-blue-400 rounded-full w-[120px] py-1"
            type="submit"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};
