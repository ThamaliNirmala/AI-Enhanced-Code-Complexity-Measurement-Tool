import React from "react";
import { useNavigate } from "react-router-dom";
import Background from "../assets/b6.jpg";
import Logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import axiosInstance from "../apis/axiosInstance";
const { REACT_APP_BASE_URL } = process.env;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axiosInstance.post(
        `${REACT_APP_BASE_URL}/api/auth/login`,
        values
      );
      const { token } = response.data;

      // Save token to localStorage
      localStorage.setItem("token", token);

      notification.success({
        message: "Login Successful",
        description:
          "You have successfully logged in. Redirecting to the dashboard...",
      });

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      notification.error({
        message: "Login Failed",
        description:
          error.response?.data?.message ||
          "Invalid credentials or something went wrong. Please try again.",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: "Login Failed",
      description: "Please check the form for errors and try again.",
    });
  };

  return (
    <div className="grid md:grid-cols-2 h-screen">
      <div
        className="bg-cover bg-center md:block hidden"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="xl:mx-36 md:mx-20 mx-10">
        <h1
          className="text-center text-[40px] font-bold mt-20 text-[#10002E] uppercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {/* <span
            className="text-[40px] uppercase"
            style={{ fontFamily: "Montserrat Alternates" }}
          >
            CodeIQ
          </span>
          <span className="block text-2xl" style={{ fontFamily: "Inter" }}>
            AI-Powered Code Complexity Analyzer
          </span> */}
          Login
        </h1>
        <hr className="mt-12" />

        <Form
          name="login"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          className="mt-7"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "The input is not a valid E-mail!",
              },
              { required: true, message: "Please input your email!" },
            ]}
            className="text-sm inter text-[#10002E]"
          >
            <Input
              prefix={<MailOutlined />}
              className="bg-[#F5F8FF]  text-[#10002E] text-sm inter"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
            className="text-sm inter text-[#10002E]"
          >
            <Input.Password
              prefix={<LockOutlined />}
              className="bg-[#F5F8FF]  text-[#10002E] text-sm inter"
            />
          </Form.Item>

          <div className="grid grid-cols-2">
            <p className="text-left">
              <Link
                to={"/forgot-password"}
                className="no-underline text-[10px] font-medium text-[#1565d8] inter"
              >
                Forgot Password
              </Link>
            </p>

            <div className="text-right">
              <Link
                to={"/register"}
                className="no-underline text-[10px] font-medium text-[#1565d8] inter"
              >
                Create account
              </Link>
            </div>
          </div>

          <Form.Item className="mt-20">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 custom-button h-9"
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
        <div className="relative flex justify-center ">
          <img src={Logo} className="fixed bottom-0 mb-16 md:block hidden " />
        </div>
      </div>
    </div>
  );
};

export default Login;
