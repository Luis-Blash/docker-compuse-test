import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../api";
import { privateRoutes } from "../../router/routesEndpoints";

export const Login = () => {
  const navigate = useNavigate();

  const sendLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    loginRequest(data).then(({ status, payload }) => {
      if (status > 0) {
        alert("No se creo");
        return;
      }
      localStorage.setItem("token", payload.token)
      navigate(`${privateRoutes.root}`);
    });
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <form onSubmit={sendLogin} className="flex flex-col gap-4">
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
