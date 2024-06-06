import { Outlet, useNavigate } from "react-router-dom";
import { publicRoutes } from "../router/routesEndpoints";

export const LayoutAuth = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-full w-full flex justify-center items-center p-10">
        <div className="grid grid-cols-2 border-[2px] border-black w-full h-full  rounded-3xl overflow-hidden">
          <div className="bg-blue-400 bg-opacity-60 flex flex-col items-center justify-center gap-4">
            <div
              onClick={() => {
                navigate(`/${publicRoutes.auth}`);
              }}
              className="p-4 bg-green-300 w-[200px] rounded-2xl flex justify-center items-center"
            >
              <p className="text-[16px] font-bold uppercase">Login</p>
            </div>
            <div
              onClick={() => {
                navigate(publicRoutes.register);
              }}
              className="p-4 bg-yellow-300 w-[200px] rounded-2xl flex justify-center items-center"
            >
              <p className="text-[16px] font-bold uppercase">Registrar</p>
            </div>
          </div>
          <div className="bg-green-400">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
