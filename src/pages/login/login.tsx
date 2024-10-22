import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { loginApi } from "api/auth";
import { handleErrorMessage } from "helper";
import { saveToken } from "helper/auth";
import { commonRules } from "helper/rules-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

type FieldType = {
  email: string;
  password: string;
};

const Login = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: login } = useMutation({
    mutationFn: loginApi,
    onError: (err) => {
      handleErrorMessage(err);
    },
    onSuccess: ({ data }) => {
      saveToken(data);
      navigate("/");
    },
  });
  return (
    <div className="bg-grey h-screen flex items-center justify-center">
      <div className="w-[400px] bg-white p-6 rounded-md shadow">
        <h1 className="text-[32px] font-bold text-center mb-4">Login</h1>
        <Form form={form} layout="vertical" onFinish={login}>
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[commonRules.required, commonRules.email]}
            required
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[commonRules.required, commonRules.password]}
            required
          >
            <Input.Password size="large" />
          </Form.Item>

          <Button
            className="mb-4"
            type="primary"
            block
            size="large"
            htmlType="submit"
          >
            {t("common.login")}
          </Button>
          <div className="flex items-center justify-center">
            <Link to={"/forgot-password"} className="underline ">
              {t("common.forgotPassword")}
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
