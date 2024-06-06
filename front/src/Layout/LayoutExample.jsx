import { Outlet, useNavigate } from "react-router-dom";
import { publicRoutes } from "../router/routesEndpoints";
import { deleteLogin } from "../api";

export const LayoutExample = () => {
  const navigate = useNavigate();

  const logoutPerfil = () => {
    deleteLogin()
      .then(() => {
        navigate(`/${publicRoutes.auth}`);
        localStorage.removeItem("token");
      })
      .catch(console.log);
  };

  return (
    <>
      <div className="h-full w-full ">
        <div className="h-[100px] bg-black bg-opacity-70 shadow-xl flex items-center px-16 gap-4">
          <div
            onClick={logoutPerfil}
            className="bg-red-900 px-4 py-1 rounded-full text-white"
          >
            <p>Salir</p>
          </div>
          <div className="bg-blue-700 px-4 py-1 rounded-full text-white">
            <p>Participar</p>
          </div>
        </div>
        <div className="h-[calc(100%-100px)] w-ful overflow-hidden">
          <Outlet />
        </div>
      </div>
    </>
  );
};
