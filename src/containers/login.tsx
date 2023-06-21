import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "../stores/root-stores";
import { useNavigate } from "react-router-dom";

interface LoginProps {}

//username: wirachai
//password: 12345678

const Login: React.FC<LoginProps> = observer(() => {
  const { authStore } = useMst();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeLoginId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const submit = (e: any) => {
    e.preventDefault();
    if (username && password) {
      authStore.requestLogin({ username, password }).then((res) => {
        if (res === "SUCCESS") navigate("/todo");
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-100">
      <form className="max-w-[480px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg shadow-lg shadow-gray-950">
        <h2 className="text-4xl dark: text-gray-400 font-bold text-center">SIGN IN</h2>
        <div className="flex flex-col text-gray-400 py-2">
          <label>User Name</label>
          <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="text" onChange={onChangeLoginId} />
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label>Password</label>
          <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="password" onChange={onChangePassword} />
        </div>
        <button
          className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={submit}
        >
          Sign In
        </button>
      </form>
    </div>
  );
});

export default Login;
