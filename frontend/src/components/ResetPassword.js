import React, { useState } from "react";
import Background from "../assets/b6.jpg";
import BackArrow from "../assets/backArrow.svg";
import Logo from "../assets/logo.svg";
import { Link, useParams } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import { LockOutlined } from "@ant-design/icons";
import axiosInstance from "../apis/axiosInstance";
const { REACT_APP_BASE_URL } = process.env;

const ResetPassword = () => {
  const { token } = useParams(); // Get the reset token from URL parameters
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `${REACT_APP_BASE_URL}/api/auth/reset-password/${token}`,
        {
          newPassword: values.password,
        }
      );

      notification.success({
        message: "Password Reset Successful",
        description:
          "Your password has been reset successfully. You can now log in with your new password.",
      });

      // Redirect or navigate to login page
      window.location.href = "/";
    } catch (error) {
      notification.error({
        message: "Password Reset Failed",
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: "Reset Failed",
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
      <div className="xl:mx-36 md:mx-20 mx-10">
        <Link to={"/"}>
          <div className="flex gap-1 mt-7 cursor-pointer">
            <img src={BackArrow} />
            <p className="inter text-base text-[#8692A6]">Back</p>
          </div>
        </Link>
        <h1
          className="text-center text-[40px]/[135%] font-bold mt-7 text-[#10002E] uppercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Reset <br /> Password
        </h1>
        <hr className="" />

        <Form
          name="reset-password"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            name="password"
            label="New Password"
            rules={[
              { required: true, message: "Please input your new password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
            hasFeedback
            className="mt-20 text-sm inter text-[#10002E]"
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your new password"
              className="bg-[#F5F8FF]  text-[#10002E] text-sm inter"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            className="text-sm inter text-[#10002E]"
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
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm your new password"
              className="bg-[#F5F8FF]  text-[#10002E] text-sm inter"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 custom-button inter h-9 "
              loading={loading}
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
        <div className="relative flex justify-center ">
          <img src={Logo} className="bottom-0 mb-24  md:block hidden fixed w-56" />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
