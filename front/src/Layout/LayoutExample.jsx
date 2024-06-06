import { Outlet, useNavigate } from "react-router-dom";
// import { publicRoutes } from "../router/routesEndpoints";

export const LayoutExample = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex gap-4 p-4">
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
