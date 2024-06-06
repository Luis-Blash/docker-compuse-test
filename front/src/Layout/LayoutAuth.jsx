import { Outlet, useNavigate } from "react-router-dom";
import { publicRoutes } from "../router/routesEndpoints";

export const LayoutAuth = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex gap-4 p-4">
        <h1
          onClick={() => {
            navigate(`/${publicRoutes.auth}`);
          }}
        >
          Login
        </h1>
        <h1
          onClick={() => {
            navigate(publicRoutes.register);
          }}
        >
          Registrar
        </h1>
      </div>
      <Outlet />
    </>
  );
};