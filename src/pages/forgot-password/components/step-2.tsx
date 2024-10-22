import { Button, Form, Input } from "antd";
import { commonRules } from "helper/rules-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type FieldType = {
  otp: string;
};

interface IProps {
  nextStep: () => void;
}

const Step2 = ({ nextStep }: IProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const checkOpt = () => {
    return true;
  };

  const handleFinish = () => {
    if (checkOpt()) {
      nextStep();
    }
  };

  return (
    <div className="bg-grey h-screen flex items-center justify-center">
      <div className="w-[400px] bg-white p-6 rounded-md shadow">
        <h1 className="text-[32px] font-bold text-center mb-4">
          {t("common.forgotPassword")}
        </h1>

        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item<FieldType>
            label="OPT"
            name="otp"
            rules={[commonRules.required]}
            required
          >
            <Input size="large" maxLength={6} />
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

export default Step2;
