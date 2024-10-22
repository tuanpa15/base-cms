import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { loginApi } from "api/auth";
import customNotification from "components/custom-notification";
import { saveToken } from "helper/auth";
import { commonRules } from "helper/rules-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

type FieldType = {
  email: string;
};

interface IProps {
  nextStep: (data: FieldType) => void;
}

const Step1 = ({ nextStep }: IProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="bg-grey h-screen flex items-center justify-center">
      <div className="w-[400px] bg-white p-6 rounded-md shadow">
        <h1 className="text-[32px] font-bold text-center mb-4">
          {t("common.forgotPassword")}
        </h1>
        <p className="mb-4">
          Please enter your email address to have your password reissued.
        </p>
        <Form form={form} layout="vertical" onFinish={nextStep}>
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[commonRules.required, commonRules.email]}
            required
          >
            <Input size="large" />
          </Form.Item>

          <Button
            className="mb-4"
            type="primary"
            block
            size="large"
            htmlType="submit"
          >
            Next
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Step1;
