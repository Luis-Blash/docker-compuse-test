import { useNavigate } from "react-router-dom";
import { privateRoutes } from "../../router/routesEndpoints";
import { useEffect, useState } from "react";
import { getUsers } from "../../api/index";

export const Example = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigate();

  const goTo = (url = privateRoutes.root) => {
    navigation(url);
  };

  useEffect(() => {
    getUsers()
      .then(({ msg, payload }) => {
        setUsers(payload);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="h-full w-full flex flex-col gap-4 px-16 py-4 bg-black bg-opacity-50">
      <div className="w-full h-[50px] flex justify-center items-center">
        <p className="text-white text-[20px] uppercase font-semibold">
          Tabla de usuarios
        </p>
      </div>
      <div className="w-full h-[calc(100%-50px)] px-10 py-5 flex flex-col gap-2 bg-gray-300 bg-opacity-40 overflow-y-scroll">
        {users.map((user, index) => (
          <div key={index} className="w-full">
            <p className="font-semibold text-[16px] text-[#0a0a0aca]">
              {user.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
