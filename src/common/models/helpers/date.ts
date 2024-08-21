import dayjs, { Dayjs } from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjsIsToday from 'dayjs/plugin/isToday';
import dayjsIsYesterDay from 'dayjs/plugin/isYesterday';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(dayjsIsToday);
dayjs.extend(dayjsIsYesterDay);

export const createDate = (date?: number | string): Dayjs => {
  return dayjs(date);
};

export const formatDate = (day: Dayjs, format = 'LLL') => {
  return day.format(format);
};

export const isBefore = (date: number, dateToCompare?: number): boolean => {
  return createDate(dateToCompare).isBefore(date);
};
