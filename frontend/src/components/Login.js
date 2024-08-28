import React from "react";
import Background from "../assets/b6.jpg";
// import Logo from "../assets/logo.svg";

const Login = () => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div
        className="bg-cover bg-center"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="mx-36 ">
        {/* <img src={Logo} className="mx-auto" /> */}
        <h1 className="text-[#10002E] text-center font-bold text-[40px] uppercase inter mt-36">
          Login
        </h1>
        <hr className="mt-16" />

        <form class="">
          <div class="mt-7">
            <label for="email" class="text-sm font-bold inter text-[#10002E] ">
              Email
            </label>
            <input
              type="email"
              id="email"
              class=" bg-[#F5F8FF] h-12 text-gray-900 text-sm inter bold rounded-lg mt-2 w-full p-2.5 "
              required
            />
          </div>

          <div class="mt-7">
            <label
              for="password"
              class="text-sm font-bold inter text-[#10002E] "
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              class=" bg-[#F5F8FF] h-12 text-gray-900 text-sm inter bold rounded-lg mt-2 w-full p-2.5 "
              required
            />
          </div>
          <p className="mt-8 text-right">
            <a
              href="#"
              className="no-underline text-base font-medium text-[#1565d8]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Fogot Password
            </a>
          </p>

          <button
            type="submit"
            class="text-white bg-[#002140] h-12 focus:outline-none w-full  font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-16 "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
