import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin, setUser,axios,navigate } = useAppContext();

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const {data} = await axios.post(`/api/user/${state}`,{name,email,password});

      if(data.success){
        navigate('/')
        setUser(data.user)
        setShowUserLogin(false);
      }else{
        toast.error(data.message)
      }

      
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    // Trigger fade-in animation
    setTimeout(() => setFadeIn(true), 50);
  }, []);

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className={`${
          fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
        } transition-all duration-500 flex flex-col gap-4 p-8 py-10 w-[90%] max-w-sm rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/30 backdrop-blur-xl bg-white/10 text-white`}
      >
        <p className="text-2xl font-bold text-center">
          <span className="text-green-400 drop-shadow-glow">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p className="text-sm">Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="w-full p-2 mt-1 rounded-md bg-white/20 text-white placeholder-white border border-white/30 outline-none focus:ring-2 focus:ring-green-400 focus:shadow-glow transition-all"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p className="text-sm">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="w-full p-2 mt-1 rounded-md bg-white/20 text-white placeholder-white border border-white/30 outline-none focus:ring-2 focus:ring-green-400 focus:shadow-glow transition-all"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p className="text-sm">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="w-full p-2 mt-1 rounded-md bg-white/20 text-white placeholder-white border border-white/30 outline-none focus:ring-2 focus:ring-green-400 focus:shadow-glow transition-all"
            type="password"
            required
          />
        </div>

        <p className="text-xs">
          {state === "register" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-green-400 underline cursor-pointer hover:text-green-300"
              >
                click here
              </span>
            </>
          ) : (
            <>
              Create an account?{" "}
              <span
                onClick={() => setState("register")}
                className="text-green-400 underline cursor-pointer hover:text-green-300"
              >
                click here
              </span>
            </>
          )}
        </p>

        <button className="mt-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md transition-all w-full shadow-md shadow-green-400/30">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
