import dayjs, { type Dayjs } from "dayjs";

export const formatDate = (
  date: string | Date | Dayjs,
  format: string = "YYYY/MM/DD HH:mm"
) => dayjs(date).format(format);
