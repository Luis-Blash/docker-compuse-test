import { Outlet, useNavigate } from "react-router-dom";
import { publicRoutes } from "../router/routesEndpoints";
import { deleteLogin } from "../api";

export const LayoutExample = () => {
  const navigate = useNavigate();

  const logoutPerfil = () => {
    deleteLogin()
    .then(() => {
      navigate(`/${publicRoutes.auth}`)
      localStorage.removeItem("token")
    })
    .catch(console.log)
  };

  return (
    <>
      <div className="flex gap-4 p-4">
        <div onClick={logoutPerfil}>
          <p>Logout</p>
        </div>
        <h1
          onClick={() => {
            // navigate(`/${publicRoutes.auth}`);
          }}
        >
          Mi perfil
        </h1>
      </div>
      <Outlet />
    </>
  );
};
