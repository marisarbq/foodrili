import {
  HOLIDAY,
  holidayDetails,
  holidays,
  restDays,
  workdays,
} from '@/configs/holidays';
import { FirstDayOfWeek } from '@/hooks/usePreference';
import dayjs from 'dayjs';
import { Lunar, Solar } from 'lunar-typescript';

export const getPercentageOfYear = (date: Date): number => {
  const startOfYear = new Date(date.getFullYear(), 0, 1); // 当年的第一天
  const endOfYear = new Date(date.getFullYear(), 11, 31); // 当年的最后一天

  const totalMilliseconds = endOfYear.getTime() - startOfYear.getTime(); // 当年的总毫秒数
  const elapsedMilliseconds = date.getTime() - startOfYear.getTime(); // 已过去的毫秒数

  const percentage = (elapsedMilliseconds / totalMilliseconds) * 100; // 计算百分比

  return Math.round(percentage * 100) / 100; // 返回百分比，保留两位小数
};

export const getWorkday = (date: Date) => {
  const dateStr = dayjs(date).format('YYYY-MM-DD');
  const holiday = workdays.get(dateStr);
  return holiday;
};

export const getSolarTerm = (date: Date) => {
  const lunarDate = Lunar.fromDate(date);
  const solarTerm = lunarDate.getJieQi();
  return solarTerm;
};

export const getRestDay = (date: Date) => {
  const dateStr = dayjs(date).format('YYYY-MM-DD');
  const holiday = restDays.get(dateStr);
  return holiday;
};

export const getFestivals = (date: Date) => {
  const solarDate = Solar.fromDate(date);
  const lunarDate = Lunar.fromDate(date);

  const solarFestivals = solarDate.getFestivals();
  const lunarFestivals = lunarDate.getFestivals();

  const festival = [...lunarFestivals, ...solarFestivals];

  return festival;
};

export const getHoliday = (date: Date) => {
  const dateStr = dayjs(date).format('YYYY-MM-DD');
  const holiday = holidays.get(dateStr);
  return holiday;
};

export type HolidaySelect = {
  value: HOLIDAY;
  label: string;
  date: string;
};

export const getHolidays = (): HolidaySelect[] => {
  const result = Array.from(holidays).map(([date, item]) => ({
    value: item,
    label: holidayDetails[item].chinese,
    date: date,
  }));
  return result;
};

export const getDatesInRange = (startDate: Date, endDate: Date) => {
  if (startDate > endDate) {
    throw new Error('开始日期不能大于结束日期');
  }

  const dates = [];
  const currDate = startDate;

  while (currDate <= endDate) {
    dates.push(currDate);
    currDate.setDate(currDate.getDate() + 1);
  }

  return dates;
};

export const getLunarDate = (date: Date) => {
  const lunarDate = Lunar.fromDate(date);

  if (lunarDate.getDay() === 1) {
    return `${lunarDate.getMonthInChinese()}月`;
  }

  return lunarDate.getDayInChinese();
};

export const generateDateList = (
  startDate: Date,
  endDate: Date,
  firstDayOfWeek: FirstDayOfWeek
): Date[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // 根据 firstDayOfWeek 调整开始日期
  let startDayOfWeek = start.getDay();
  startDayOfWeek = startDayOfWeek === 0 ? 7 : startDayOfWeek; // 将星期日修正为7
  const startDifference =
    startDayOfWeek - (firstDayOfWeek === FirstDayOfWeek.Sunday ? 0 : 1);
  start.setDate(start.getDate() - (startDifference >= 0 ? startDifference : 6));

  // 根据 firstDayOfWeek 调整结束日期
  let endDayOfWeek = end.getDay();
  endDayOfWeek = endDayOfWeek === 0 ? 7 : endDayOfWeek; // 将星期日修正为7
  const endDifference =
    (firstDayOfWeek === FirstDayOfWeek.Sunday ? 6 : 7) - endDayOfWeek;
  end.setDate(
    end.getDate() + (endDifference > 0 && endDifference < 7 ? endDifference : 0)
  );

  const dateList: Date[] = [];

  // 循环生成日期列表
  while (start <= end) {
    dateList.push(new Date(start));
    start.setDate(start.getDate() + 1);
  }

  return dateList;
};
