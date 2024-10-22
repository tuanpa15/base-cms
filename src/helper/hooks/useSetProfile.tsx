import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "api/auth";
import Cookies from "js-cookie";
import { useEffect } from "react";
import useBounceStore from "store/bounceStore";
import { QueryKey } from "utils/enums";

const useSetProfile = () => {
  const token = Cookies.get("token");
  const setProfile = useBounceStore((state) => state.setProfile);
  const { data, status } = useQuery({
    queryKey: [QueryKey.GET_PROFILE],
    queryFn: getProfileApi,
    enabled: !!token,
  });
  useEffect(() => {
    if (status === "success") {
      setProfile(data.data);
    }
  }, [status]);
};

export default useSetProfile;
