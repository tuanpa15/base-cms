import customNotification from "components/custom-notification";
import i18n from "i18n/i18n";

export const getIndexTable = ({
  pageIndex,
  pageSize,
  index = 0,
}: {
  pageIndex: number;
  pageSize: number;
  index?: number;
}) => {
  return (pageIndex - 1) * pageSize + index + 1;
};

export const getErrorMessage = (error: any) => {
  return error?.response?.data?.errorMessage || "Something went wrong!";
};

export const handleErrorMessage = (error: any) => {
  customNotification({
    type: "error",
    message: i18n.t("common.error"),
    description: getErrorMessage(error),
  });
};
