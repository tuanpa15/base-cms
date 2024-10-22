import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { DEFAULT_FILTER } from "utils/constants";
import queryString from "query-string";

export default function useFilter<T>(defaultFilter?: T) {
  const navigate = useNavigate();
  const location = useLocation();

  const [filter, setFilter] = useState<any>({
    ...DEFAULT_FILTER,
    ...defaultFilter,
  });

  useEffect(() => {
    const searchParams = queryString.parse(location.search);
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      ...searchParams,
    }));
  }, [location.search]);

  const handleFilterChange = (changeValue: T = {} as T) => {
    const stringifiedParams = queryString.stringify({
      ...filter,
      ...changeValue,
      pageIndex: 1,
    });
    navigate(`${location.pathname}?${stringifiedParams}`, { replace: true });
    // setFilter({
    //   ...filter,
    //   ...changeValue,
    //   pageIndex: 1,
    // });
  };
  const debounceKeyword = useDebouncedCallback((keyword) => {
    handleFilterChange({
      ...filter,
      keyword,
      page: 1,
    });
  }, 300);
  const handlePageChange = (page: number, pageSize: number) => {
    setFilter({ ...filter, pageIndex: page, pageSize });
  };

  const resetFilter = () => {
    if (defaultFilter) {
      setFilter({ ...DEFAULT_FILTER, ...defaultFilter });
    } else {
      setFilter(DEFAULT_FILTER);
    }
  };

  return {
    filter,
    handleFilterChange,
    handlePageChange,
    debounceKeyword,
    resetFilter,
  };
}
