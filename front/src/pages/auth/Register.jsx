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
    <div className="p-4 flex flex-col gap-4">
      <form onSubmit={sendRegister} className="flex flex-col gap-4">
        <input name="email" placeholder="Email" type="email" required />
        <input
          name="password"
          placeholder="Contraseña"
          type="password"
          pattern=".{8,}"
          title="La contraseña debe tener al menos 8 caracteres"
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
