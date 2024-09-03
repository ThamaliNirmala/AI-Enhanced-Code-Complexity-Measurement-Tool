import React from "react";
import Background from "../assets/b6.jpg";
import BackArrow from "../assets/backArrow.svg";
import Logo from "../assets/logo.svg";
import { Form, Input, Button, notification } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axiosInstance from "../apis/axiosInstance";
const { REACT_APP_BASE_URL } = process.env;

const ForgotPassword = () => {
  const onFinish = async (values) => {
    try {
      await axiosInstance.post(
        `${REACT_APP_BASE_URL}/api/auth/forgot-password`,
        values
      );
      notification.success({
        message: "Reset Email Sent",
        description:
          "If an account with that email exists, a password reset link has been sent to your email address.",
      });
    } catch (error) {
      notification.error({
        message: "Request Failed",
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: "Request Failed",
      description: "Please check the form and try again.",
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
      <div className="xl:mx-36 md:mx-20 mx-10 ">
        <Link to={"/"}>
          <div className="flex gap-1 mt-7 cursor-pointer">
            <img src={BackArrow} />
            <p className="inter  text-base text-[#8692A6]">Back</p>
          </div>
        </Link>
        <div className="my-[75px]">
          <div className="relative flex justify-center ">
            <img src={Logo} className=" md:block hidden w-[350px]" />
          </div>

          <hr className="mt-12" />

          <Form
            name="forgot-password"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            className="mt-16 text-sm inter text-[#10002E]"
          >
            <p className="font-medium text-base text-[#000000] inter">
              Enter the your Email associate with the account
            </p>
            <p className="font-medium text-base text-[#B4B7B9] mt-2 mb-7 inter">
              We will email you a link to rest your password
            </p>
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
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter your email"
                className="bg-[#F5F8FF]  text-[#10002E] text-sm inter h-10"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 custom-button inter h-9 "
              >
                Send Reset Link
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
