import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

interface IProps {
  title: string;
  hasBack?: boolean;
}

const SubTitlePage = ({ title, hasBack = true }: IProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center">
      {hasBack && (
        <Button
          type="text"
          onClick={() => navigate(-1)}
          className="flex items-center justify-center"
        >
          <LeftOutlined className="text-lg" />
        </Button>
      )}
      <h3 className="text-[28px] font-bold text-primary">{title}</h3>
    </div>
  );
};

export default SubTitlePage;
