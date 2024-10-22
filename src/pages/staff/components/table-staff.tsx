import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { getIndexTable, handleErrorMessage } from "../../../helper";
import CustomTable from "../../../components/custom-table";
import { Switch } from "antd";
import {
  CustomAction,
  CustomConfirm,
} from "../../../components/action-table/action-table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStaffApi, updateStatusStaffApi } from "api/staff";
import customNotification from "components/custom-notification";
import { CommonStatus, QueryKey } from "utils/enums";
import { IStaff } from "utils/interface/staff";
interface IProps {
  data: IStaff[] | undefined;
  isLoading: boolean;
  pageIndex: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (pageIndex: number, pageSize: number) => void;
}

const TableStaff = ({
  data,
  isLoading,
  pageIndex,
  pageSize,
  totalItems,
  onPageChange,
}: IProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: updateStatusStaff } = useMutation({
    mutationFn: updateStatusStaffApi,
    onError: (err) => handleErrorMessage(err),
    onSuccess: () => {
      customNotification({
        type: "success",
        message: t("common.success"),
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_LIST_STAFFS],
      });
    },
  });
  const { mutate: deleteStaff } = useMutation({
    mutationFn: deleteStaffApi,
    onError: (err) => handleErrorMessage(err),
    onSuccess: () => {
      customNotification({
        type: "success",
        message: t("common.success"),
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKey.GET_LIST_STAFFS],
      });
    },
  });
  const columns: ColumnsType<any> = [
    {
      title: t("common.index"),
      dataIndex: "id",
      key: "id",
      width: 50,
      align: "center",
      render: (_text: string, _record: any, index: number) => (
        <p className="min-w-[50px]">
          {getIndexTable({ pageIndex, pageSize, index })}
        </p>
      ),
    },
    {
      title: t("common.name"),
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: t("common.email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("common.status"),
      key: "status",
      width: 60,
      align: "center",
      render: (record: IStaff) => {
        return (
          <div>
            <Switch
              checked={record?.status === CommonStatus.ACTIVE}
              onChange={(value) => {
                updateStatusStaff({
                  id: record?.id,
                  status: value ? CommonStatus.ACTIVE : CommonStatus.INACTIVE,
                });
              }}
            />
          </div>
        );
      },
    },
    {
      title: <div />,
      key: "action",
      width: 100,
      align: "center",
      render: (record: IStaff) => {
        return (
          <div className="flex items-center gap-1">
            <CustomAction
              onClick={() => {
                navigate(`/staff/${record?.id}`);
              }}
            >
              <EditOutlined className="text-[20px] text-red-500" />
            </CustomAction>
            <CustomConfirm
              textConfirm={t("confirm.deleteStaff")}
              onConfirm={() => deleteStaff(record?.id)}
            >
              <DeleteOutlined className="text-[20px] text-red-500" />
            </CustomConfirm>
          </div>
        );
      },
    },
  ];
  return (
    <CustomTable
      columns={columns}
      dataSource={data || []}
      isLoading={isLoading}
      onPageChange={onPageChange}
      pageIndex={pageIndex}
      totalItems={Number(totalItems)}
    />
  );
};

export default TableStaff;
