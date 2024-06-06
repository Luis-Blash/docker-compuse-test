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
      .then(({ payload }) => {
        setUsers(payload);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4 m-2">
      <p>Emails registrados</p>
      <div className="flex flex-col gap-2">
        {users.map((user, index) => (
          <p key={index}>{user.email}</p>
        ))}
      </div>
    </div>
  );
};
