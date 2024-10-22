import { Empty, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useTranslation } from "react-i18next";

interface IProps extends TableProps<Record<string, any>> {
  dataSource: any[];
  isLoading?: boolean;
  columns: ColumnsType<any>;
  onRow?: (data: any) => any;
  totalItems?: number;
  pageIndex?: number;
  scroll?: { x?: number; y?: number };
  onPageChange?: (page: number, take: number) => void | undefined;
  hidePagination?: boolean;
}

export default function CustomTable({
  dataSource,
  columns,
  onRow,
  totalItems,
  isLoading,
  onPageChange,
  scroll,
  pageIndex,
  hidePagination,
  ...rest
}: IProps) {
  const [t] = useTranslation();

  return (
    <Table
      dataSource={dataSource || []}
      loading={isLoading}
      columns={columns}
      className="table-custom"
      bordered={false}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={t("common.noData")}
          />
        ),
      }}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            if (!!onRow) {
              onRow(record);
            }
          }, // click row
        };
      }}
      scroll={scroll ? scroll : { x: 1024 }}
      pagination={
        hidePagination
          ? false
          : {
              defaultCurrent: 1,
              total: totalItems,
              defaultPageSize: 10,
              showLessItems: true,
              showSizeChanger: true,
              onChange: onPageChange,
              current: pageIndex,

              showTotal: (total) => {
                return `${t("common.total")} ${totalItems} ${t(
                  "common.items"
                )}`;
              },
            }
      }
      {...rest}
    />
  );
}
