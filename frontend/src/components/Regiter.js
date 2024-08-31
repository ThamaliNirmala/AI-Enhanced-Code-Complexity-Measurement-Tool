import React from "react";
import { useNavigate } from "react-router-dom";
import Background from "../assets/b6.jpg";
import Logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { Form, Input, Button, Select, notification } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;

const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        `${REACT_APP_BASE_URL}/api/auth/register`,
        values
      );
      notification.success({
        message: "Registration Successful",
        description:
          "You have successfully registered. Redirecting to login...",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      notification.error({
        message: "Registration Failed",
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: "Registration Failed",
      description: "Please check the form for errors and try again.",
    });
  };

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
      <div className="mx-36">
        <h1
          className="text-center text-[40px] font-bold mt-10 text-[#10002E] uppercase"
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
          Register
        </h1>

        <hr className="mt-5" />

        <Form
          name="register"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          className="mt-7"
        >
          <Form.Item
            name="username"
            label="User Name"
            rules={[{ required: true, message: "Please input your username!" }]}
            className="text-sm inter text-[#10002E]"
          >
            <Input
              prefix={<UserOutlined />}
              className="bg-[#F5F8FF]  text-[#10002E] text-sm inter"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
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
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
            hasFeedback
            className="text-sm inter text-[#10002E]"
          >
            <Input.Password
              prefix={<LockOutlined />}
              className="bg-[#F5F8FF]  text-[#10002E] text-sm inter"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
            className="text-sm inter text-[#10002E]"
          >
            <Input.Password
              prefix={<LockOutlined />}
              className="bg-[#F5F8FF]  text-[#10002E] text-sm inter"
            />
          </Form.Item>

          <Form.Item
            name="role"
            label="User Role"
            rules={[{ required: true, message: "Please select your role!" }]}
            className="text-sm inter text-[#10002E]"
          >
            <Select
              placeholder="Select a role"
              className="bg-[#F5F8FF] text-[#10002E] text-sm inter"
            >
              <Option value="developer">Developer</Option>
              <Option value="hr">HR</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>

          <div className="text-right">
            <Link
              to={"/"}
              className="no-underline text-[10px] font-medium text-[#1565d8] inter"
            >
              Already have an account?
            </Link>
          </div>

          <Form.Item className="mt-2">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 custom-button inter"
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <div className="relative flex justify-center ">
          <img src={Logo} className="fixed bottom-0 mb-5" />
        </div>
      </div>
    </div>
  );
};

export default Register;
