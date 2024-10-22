import { UserOutlined, FolderOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import useBounceStore from "store/bounceStore";

const SideNav = () => {
  const { t } = useTranslation();
  const [selectedKey, setSelectedKey] = useState("1");
  const navigate = useNavigate();
  const collapsed = useBounceStore((state) => state.collapsed);
  const setCollapsed = useBounceStore((state) => state.setCollapsed);

  const items = [
    {
      label: <Link to={"/staff"}>{t("staff.management")}</Link>,
      url: "/staff",
      key: "1",
      icon: <UserOutlined />,
      hasPermission: true,
    },
    {
      label: <Link to={"/staff"}>{t("user.management")}</Link>,
      url: "/user",
      key: "2",
      icon: <FolderOutlined />,
      hasPermission: true,
    },

    // {
    //   label: "Navigation Three - Submenu",
    //   key: "SubMenu",
    //   icon: <SettingOutlined />,
    //   children: [
    //     {
    //       type: "group",
    //       label: "Item 1",
    //       children: [
    //         {
    //           label: "Option 1",
    //           key: "setting:1",
    //         },
    //         {
    //           label: "Option 2",
    //           key: "setting:2",
    //         },
    //       ],
    //     },
    //     {
    //       type: "group",
    //       label: "Item 2",
    //       children: [
    //         {
    //           label: "Option 3",
    //           key: "setting:3",
    //         },
    //         {
    //           label: "Option 4",
    //           key: "setting:4",
    //         },
    //       ],
    //     },
    //   ],
    // },
  ];

  useEffect(() => {
    items.forEach((route: any) => {
      if (location.pathname.startsWith(route.url || "###")) {
        setSelectedKey(route.key);
      }
      if (route.children) {
        route.children.forEach((childRoute: any) => {
          if (location.pathname.startsWith(childRoute.url || "###")) {
            setSelectedKey(childRoute.key);
          }
        });
      }
    });
  }, [location.pathname]);
  useEffect(() => {
    const firstVisibleRoute: any = items.find((route) => route.hasPermission);
    if (
      location.pathname === "/" &&
      firstVisibleRoute?.hasPermission
      // permissions &&
      // role
    ) {
      if (firstVisibleRoute?.children) {
        const firstChildrenVisible = firstVisibleRoute?.children?.find(
          (route: any) => route.hasPermission
        );
        navigate(firstChildrenVisible?.url);
      } else {
        navigate(firstVisibleRoute?.url);
      }
    }
  }, [location.pathname]);
  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="transition-all"
      collapsedWidth={0}
    >
      <div className="overflow-hidden h-full flex flex-col ">
        <div
          className="h-header min-h-[60px] flex justify-center items-center cursor-pointer font-bold text-[20px] text-primary"
          onClick={() => navigate("/")}
        >
          Logo
        </div>
        <Menu
          selectedKeys={[selectedKey]}
          className="overflow-y-auto"
          mode="inline"
          items={items.filter((item) => item.hasPermission)}
        />
      </div>
    </Layout.Sider>
  );
};

export default SideNav;
