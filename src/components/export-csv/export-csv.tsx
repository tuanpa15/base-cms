import { CSVLink } from "react-csv";
import { Data } from "react-csv/lib/core";
import { FileTextOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface IProps {
  data: string | Data | (() => string | Data);
  filename?: string;
  textDownload?: string;
}

const ExportCsv = ({ data, filename = "table.csv", textDownload }: IProps) => {
  const { t } = useTranslation();
  return (
    <CSVLink
      data={data}
      filename={filename}
      target="_blank"
      className="px-[15px] text-[14px] bg-danger h-[32px] flex items-center rounded-[6px] gap-1 text-white w-fit whitespace-nowrap"
    >
      <FileTextOutlined />
      {textDownload || t("common.downloadCsv")}
    </CSVLink>
  );
};

export default ExportCsv;
