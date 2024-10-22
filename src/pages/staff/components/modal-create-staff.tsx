import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Modal, type FormProps } from "antd";
import { addStaffApi } from "api/staff";
import customNotification from "components/custom-notification";
import { handleErrorMessage } from "helper";
import { commonRules } from "helper/rules-form";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { QueryKey } from "utils/enums";
import { IParamsAddStaff } from "utils/interface/staff";

interface IProps {
  open: boolean;
  onClose: () => void;
}

const ModalCreateStaff = ({ open, onClose }: IProps) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  useEffect(() => {
    form.resetFields();
  }, [open]);
  const { mutate: addStaff, isPending } = useMutation({
    mutationFn: addStaffApi,
    onError: (err) => handleErrorMessage(err),
    onSuccess: () => {
      customNotification({
        type: "success",
        message: t("common.success"),
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_LIST_STAFFS],
      });
      onClose();
    },
  });

  return (
    <Modal open={open} onCancel={onClose} footer={null}>
      <h3 className="text-[24px] font-bold text-center mb-4">
        {t("staff.add")}
      </h3>
      <Form form={form} layout="vertical" onFinish={addStaff}>
        <Form.Item<IParamsAddStaff>
          label={t("common.email")}
          name="email"
          rules={[commonRules.required, commonRules.email]}
          required
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item<IParamsAddStaff>
          label={t("common.fullName")}
          name="fullName"
          rules={[commonRules.required]}
          required
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item<IParamsAddStaff>
          label={t("common.password")}
          name="password"
          rules={[commonRules.required, commonRules.password]}
          required
        >
          <Input.Password size="large" />
        </Form.Item>
        <div className="grid grid-cols-2 gap-x-4 pt-2">
          <Button size="large" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={isPending}
          >
            {t("common.create")}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalCreateStaff;
