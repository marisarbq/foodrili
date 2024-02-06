import { holidayDetails } from '@/configs/holidays';
import { useCustomDay } from '@/hooks/useCustomDay';
import clsxm from '@/libs/clsxm';
import { getBadgeText } from '@/libs/day';
import DateComponent from './DateComponent';
import { Day } from '@/interfaces/day';
import { chooseLunchByTimestamp } from '../libs/foods';
import { isWeekend } from 'date-fns';

const getContent = (day: Day, customContent?: string) => {

  if(!(day.isWeekend || day.isHoliday) && !day.isRestDay) {
    return chooseLunchByTimestamp(day.date.toISOString());  
  } else {
    return "休息"
  }
};

const DateContainer = ({
  day,
  markWeekend,
  isSelected,
  disabled,
  showContent,
  highlightToday,
  isCurrentMonth,
  dimNonCurrentMonth,
  onClick,
}: {
  day: Day;
  markWeekend?: boolean;
  isSelected: boolean;
  disabled?: boolean;
  showContent?: boolean;
  highlightToday?: boolean;
  isCurrentMonth?: boolean;
  // 添加一个参数决定不是当前月份的日期是否半透明
  dimNonCurrentMonth?: boolean;
  onClick?: () => void;
}) => {
  const { date } = day;
  const { customDay } = useCustomDay(date);
  const { isToday, isRestDay, isWeekend, isWorkDay } = day;
  const { theme, badge: customBadge, content: customContent } = customDay;

  const badgeText = getBadgeText(day, customBadge);

  const contentText = showContent ? getContent(day, customContent) : '';

  const showBadge =
    (isToday && highlightToday && badgeText !== '') ||
    (!isToday && badgeText !== '');

  const isRestDayTheme = theme === 'restDay' || isRestDay;

  const isWorkdayTheme = theme === 'workday' || isWorkDay;

  return (
    <DateComponent
      key={date.toString()}
      date={date}
      content={contentText}
      badgeText={badgeText}
      showBadge={showBadge}
      className={clsxm(
        !isSelected && !disabled && 'hover:bg-blue-100 dark:hover:bg-zinc-600',
        !isCurrentMonth && dimNonCurrentMonth && 'opacity-50',
        ((markWeekend && isWeekend) || isRestDayTheme) &&
          'text-red-500 dark:text-red-500',
        isRestDayTheme && 'bg-red-200 opacity-100 dark:bg-red-200',
        highlightToday && isToday && 'text-blue-500 dark:text-blue-500',
        isSelected && 'bg-blue-400 text-white dark:text-white dark:bg-blue-400',
        disabled && 'cursor-default'
      )}
      dateClassName={clsxm(
        ((markWeekend && isWeekend) || isRestDayTheme) &&
          'text-red-500 dark:text-red-500',
        highlightToday && isToday && 'text-blue-500 dark:text-blue-500',
        isSelected && 'text-white dark:text-white'
      )}
      badgeClassName={clsxm(
        isRestDayTheme && 'bg-red-500',
        isWorkdayTheme && 'bg-blue-900',
        isToday && 'bg-blue-500'
      )}
      onClick={onClick}
    />
  );
};

export default DateContainer;

DateContainer.defaultProps = {
  highlightToday: true,
  dimNonCurrentMonth: true,
};
