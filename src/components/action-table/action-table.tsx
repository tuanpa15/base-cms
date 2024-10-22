import { AbstractTooltipProps } from "antd/es/tooltip";
import React, { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";

interface IProps {
  onClick?: (data?: any) => any;
  textConfirm?: string;
  className?: string;
  classNameIcon?: string;
  disabled?: boolean;
  children?: ReactNode;
}
interface IPropsCustomConfirm extends AbstractTooltipProps {
  onConfirm?: (data?: any) => any;
  textConfirm?: string;
  className?: string;
  classNameIcon?: string;
  disabled?: boolean;
  children?: ReactNode;
}

function CustomAction({ onClick, className, children }: IProps) {
  return (
    <Button
      type="text"
      className={cn("p-1 flex", className)}
      onClick={(e: any) => {
        e.stopPropagation();
        onClick?.(e);
      }}
    >
      {children}
    </Button>
  );
}

function CustomConfirm({
  textConfirm,
  onConfirm,
  className,
  children,
  placement = "topLeft",
  ...rest
}: IPropsCustomConfirm) {
  const { t } = useTranslation();

  return (
    <Popconfirm
      {...rest}
      placement={placement}
      title={textConfirm}
      onConfirm={(e: any) => {
        e.stopPropagation();
        onConfirm?.(e);
      }}
      onCancel={(e: any) => {
        e.stopPropagation();
      }}
      cancelText={t("common.cancel")}
    >
      <Button
        type="text"
        className={cn("p-1 flex", className)}
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        {children}
      </Button>
    </Popconfirm>
  );
}

export { CustomAction, CustomConfirm };
