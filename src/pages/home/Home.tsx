import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return <div>{t("common.home")}</div>;
};

export default Home;
