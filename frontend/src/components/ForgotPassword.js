import React from "react";
import { Form, Input, Button, notification } from "antd";
import { MailOutlined } from "@ant-design/icons";
import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;

const ForgotPassword = () => {
  const onFinish = async (values) => {
    try {
      await axios.post(`${REACT_APP_BASE_URL}/api/auth/forgot-password`, values);
      notification.success({
        message: "Reset Email Sent",
        description: "If an account with that email exists, a password reset link has been sent to your email address.",
      });
    } catch (error) {
      notification.error({
        message: "Request Failed",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
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
    <div className="grid grid-cols-1 h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold text-[#650D26] mb-6">
          Forgot Password
        </h1>

        <Form
          name="forgot-password"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
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
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-[#002140] text-white"
            >
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
