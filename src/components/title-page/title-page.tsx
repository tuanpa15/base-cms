import { cn } from "../../utils/cn";

interface IProps {
  title: string;
  total: number;
  unit: string;
  className?: string;
}

const TitlePage = ({ title, total, unit, className }: IProps) => {
  return (
    <h1 className={cn("text-[28px] font-bold ", className)}>
      <span className="text-grey-100">{title}: </span>
      <span className="text-primary">
        {total}
        {unit}
      </span>
    </h1>
  );
};

export default TitlePage;
