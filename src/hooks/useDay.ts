import { Lunar } from 'lunar-typescript';
import useHoliday from './useHoliday';
import useIsWeekend from './useIsWeekend';
import useRestDay from './useRestDay';
import useWorkday from './useWorkday';
import { DAY_TYPE, HOLIDAY } from '../configs/holidays';

export type Day = {
  date: Date;
  lunarDate: string;
  isToday: boolean;
  isWeekend: boolean;
  holiday?: HOLIDAY;
  restDay?: string;
  workDay?: string;
  isHoliday: boolean;
  isRestDay: boolean;
  isWorkDay: boolean;
  dayType: DAY_TYPE;
};

const getLunarDate = (date: Date) => {
  const lunarDate = Lunar.fromDate(date);

  if (lunarDate.getDay() === 1) {
    return `${lunarDate.getMonthInChinese()}月`;
  }

  return lunarDate.getDayInChinese();
};

const useDay = (date: Date): Day => {
  const isWeekend = useIsWeekend(date);
  const holiday = useHoliday(date);
  const restDay = useRestDay(date);
  const workDay = useWorkday(date);
  const currentDate = new Date();

  const lunarDate = getLunarDate(date);

  const isHoliday = holiday !== undefined;
  const isRestDay = isHoliday || restDay !== undefined;
  const isWorkDay = workDay !== undefined;
  const isToday =
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear();

  const dayType = isRestDay ? DAY_TYPE.REST_DAY : DAY_TYPE.WORKDAY;

  return {
    date,
    lunarDate,
    isWeekend,
    holiday,
    restDay,
    workDay,
    isHoliday,
    isRestDay,
    isWorkDay,
    isToday,
    dayType,
  };
};

export default useDay;
