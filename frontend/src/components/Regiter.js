import React from "react";
import Background from "../assets/b6.jpg";
import { Link } from "react-router-dom";
import { Form, Input, Button, Select } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

const { Option } = Select;

const Register = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
        <h1 className="text-center font-bold mt-20 text-[#650D26]">
          <span
            className="text-[40px] uppercase"
            style={{ fontFamily: "Montserrat Alternates" }}
          >
            CodeIQ
          </span>
          <span className="block text-2xl" style={{ fontFamily: "Inter" }}>
            AI-Powered Code Complexity Analyzer
          </span>
        </h1>

        <hr className="mt-12" />

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
            className="text-sm font-bold inter text-[#10002E]"
          >
            <Input
              prefix={<UserOutlined />}
              className="bg-[#F5F8FF] h-12 text-gray-900 text-sm bold inter rounded-lg w-full p-2.5"
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
            className="text-sm font-bold inter text-[#10002E]"
          >
            <Input
              prefix={<MailOutlined />}
              className="bg-[#F5F8FF] h-12 text-gray-900 text-sm bold inter rounded-lg w-full p-2.5"
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
            className="text-sm font-bold inter text-[#10002E]"
          >
            <Input.Password
              prefix={<LockOutlined />}
              className="bg-[#F5F8FF] h-12 text-gray-900 text-sm bold inter rounded-lg w-full p-2.5"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords that you entered do not match!")
                  );
                },
              }),
            ]}
            className="text-sm font-bold inter text-[#10002E]"
          >
            <Input.Password
              prefix={<LockOutlined />}
              className="bg-[#F5F8FF] h-12 text-gray-900 text-sm bold inter rounded-lg w-full p-2.5"
            />
          </Form.Item>

          <Form.Item
            name="role"
            label="User Role"
            rules={[{ required: true, message: "Please select your role!" }]}
            className="text-sm font-bold inter text-[#10002E]"
          >
            <Select
              placeholder="Select a role"
              className="bg-[#F5F8FF] text-[#10002E] h-12 text-sm rounded-lg w-full inter p-2.5"
            >
              <Option value="developer">Developer</Option>
              <Option value="hr">HR</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>

          <div className="text-right mt-8">
            <Link
              to={"/"}
              className="no-underline text-base font-medium text-[#1565d8]"
            >
              Already have an account?
            </Link>
          </div>

          <Form.Item className="mt-8">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 bg-[#002140] text-white font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
