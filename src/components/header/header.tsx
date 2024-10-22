import { Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import { logout } from "../../helper/auth";
import {
  CaretDownOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import useBounceStore from "store/bounceStore";

const Header = () => {
  const { t } = useTranslation();
  const collapsed = useBounceStore((state) => state.collapsed);
  const setCollapsed = useBounceStore((state) => state.setCollapsed);

  const items = [
    {
      label: (
        <div className="flex items-center gap-1" onClick={logout}>
          <LogoutOutlined />
          <span>{t("common.logout")}</span>
        </div>
      ),
      key: "",
    },
  ];
  return (
    <header className="shadow h-header flex items-center p-4 justify-between">
      <MenuOutlined
        className="cursor-pointer"
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      />
      <Dropdown menu={{ items }} trigger={["click"]}>
        <div className="flex items-center gap-1">
          <p className="cursor-pointer font-bold">superadmin@gmail.com</p>
          <CaretDownOutlined />
        </div>
      </Dropdown>
    </header>
  );
};

export default Header;
