import { Button, Input } from "antd";

import { fakeStaffs } from "./fakeStaff";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import ModalCreateStaff from "./components/modal-create-staff";
import { useState } from "react";
import TitlePage from "components/title-page";
import TableStaff from "./components/table-staff";
import useFilter from "helper/hooks/useFilter";
import ExportCsv from "components/export-csv";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "utils/enums";
import { getListStaffsApi } from "api/staff";
import { useTranslation } from "react-i18next";
import { formatDate } from "helper/date";

const Staff = () => {
  const { t } = useTranslation();
  const { filter, debounceKeyword, handlePageChange } = useFilter({});
  const { data, isFetching } = useQuery({
    queryKey: [QueryKey.GET_LIST_STAFFS, filter],
    queryFn: () => getListStaffsApi(filter),
  });
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <TitlePage
          title={t("total.numberOfStaff")}
          total={5}
          unit={t("common.person")}
        />
        <div className="flex items-center gap-4">
          <Input
            prefix={<SearchOutlined className="text-[16px] text-grey-100" />}
            className="w-[200px]"
            onChange={(event) => debounceKeyword(event.target.value)}
            placeholder={t("placeholder.searchKeyword")}
          />
          <ExportCsv
            data={data?.data || []}
            filename={`list-staff-${formatDate(new Date())}`}
          />
          <Button
            type="primary"
            className="flex items-center"
            onClick={() => setOpen(true)}
          >
            <PlusOutlined />
            {t("staff.add")}
          </Button>
        </div>
      </div>
      <TableStaff
        data={data?.data}
        isLoading={isFetching}
        onPageChange={handlePageChange}
        pageIndex={data?.pageIndex || 1}
        pageSize={filter.pageSize}
        totalItems={data?.totalItems || 0}
      />
      <ModalCreateStaff open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Staff;
