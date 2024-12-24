import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { useLoginMutation } from "../redux/api/auth/authApi";
import { setPassword, setUserName } from "../redux/features/loginSlice";
import { setToken } from "../redux/features/userSlice";
import { jwtDecode } from "jwt-decode";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { name, password } = useAppSelector((state: RootState) => state.login);
  const [login, { data }] = useLoginMutation();

  //   const { token } = useAppSelector((state: RootState) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await login({ username: name, password });
    const { token } = data?.data;
    const user = jwtDecode(token);
    console.log("user login succefully", token, "user-decoded", user);
    dispatch(setToken(token));
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Login</h1>
        <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              User Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => dispatch(setUserName(e.target.value))}
              id="name"
              placeholder="Enter your user name"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              id="password"
              placeholder="Enter your password"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
