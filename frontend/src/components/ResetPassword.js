import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import { LockOutlined } from "@ant-design/icons";
import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;

const ResetPassword = () => {
  const { token } = useParams(); // Get the reset token from URL parameters
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${REACT_APP_BASE_URL}/api/auth/reset-password/${token}`, {
        newPassword: values.password,
      });

      notification.success({
        message: "Password Reset Successful",
        description: "Your password has been reset successfully. You can now log in with your new password.",
      });

      // Redirect or navigate to login page
      window.location.href = "/";
    } catch (error) {
      notification.error({
        message: "Password Reset Failed",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
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
    <div className="grid grid-cols-1 h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold text-[#650D26] mb-6">
          Reset Password
        </h1>

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
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your new password"
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
                  return Promise.reject(new Error("The two passwords that you entered do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm your new password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-[#002140] text-white"
              loading={loading}
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
