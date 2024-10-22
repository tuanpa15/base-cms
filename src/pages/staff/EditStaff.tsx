import { Button, Form, Input, Radio } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fakeStaffs } from "./fakeStaff";
import SubTitlePage from "../../components/sub-title-page/sub-title-page";

const EditStaff = () => {
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...fakeStaffs[Number(id) - 1],
    });
  }, []);
  const handleFinish = (value: any) => {
    console.log(value);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <SubTitlePage title="Edit staff" />
        <div className="flex gap-2">
          <Button size="large" className="w-[100px]">
            Cancel
          </Button>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            onClick={form.submit}
            className="w-[100px]"
          >
            Edit
          </Button>
        </div>
      </div>
      <div className="p-4 shadow-sm bg-white rounded-md">
        <Form
          form={form}
          layout="vertical"
          className="w-[1024px]"
          onFinish={handleFinish}
        >
          <h4 className="text-[18px] font-bold mb-4 text-primary">
            Base information
          </h4>

          <div className="grid grid-cols-2 gap-x-6">
            <Form.Item label="Email" name="email" required>
              <Input size="large" disabled />
            </Form.Item>
            <Form.Item label="Name" name="fullName" required>
              <Input size="large" disabled />
            </Form.Item>
          </div>
          <h4 className="text-[18px] font-bold mb-4 text-primary">
            Permissions
          </h4>
          <div className="grid grid-cols-[minmax(300px,300px)_1fr]">
            <p className="text-[18px] font-bold ">1. Staff management</p>
            <Form.Item name={["permissions", "staff"]} required>
              <Radio.Group>
                <Radio className="text-[16px]" value="1">
                  Edit
                </Radio>
                <Radio className="text-[16px]" value="2">
                  View
                </Radio>
                <Radio className="text-[16px]" value="3">
                  Dont have permission
                </Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <div className="grid grid-cols-[minmax(300px,300px)_1fr]">
            <p className="text-[18px] font-bold ">2. User management</p>
            <Form.Item name={["permissions", "user"]} required>
              <Radio.Group>
                <Radio className="text-[16px]" value="1">
                  Edit
                </Radio>
                <Radio className="text-[16px]" value="2">
                  View
                </Radio>
                <Radio className="text-[16px]" value="3">
                  Dont have permission
                </Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditStaff;
