import { Button, Form, Input } from "antd";
import { commonRules } from "helper/rules-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type FieldType = {
  password: string;
  confirmPassword: string;
};

const Step3 = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const checkOpt = () => {
    return true;
  };

  const handleFinish = () => {
    navigate("/login");
  };

  return (
    <div className="bg-grey h-screen flex items-center justify-center">
      <div className="w-[400px] bg-white p-6 rounded-md shadow">
        <h1 className="text-[32px] font-bold text-center mb-4">
          {t("common.forgotPassword")}
        </h1>

        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item<FieldType>
            label="New password"
            name="password"
            rules={[commonRules.required, commonRules.password]}
            required
          >
            <Input.Password size="large" />
          </Form.Item>
          <Form.Item<FieldType>
            dependencies={["password"]}
            label="Confirm password"
            name="confirmPassword"
            rules={[commonRules.required, commonRules.confirmPassword]}
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
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Step3;
