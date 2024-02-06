import { atom, useAtom } from 'jotai';
function convertToStartOfDay(date) {  
  // 创建一个新的日期对象，以避免修改原始日期  
  const startOfDay = new Date(date.getTime());  
  
  // 设置小时、分钟、秒和毫秒为0  
  startOfDay.setHours(0, 0, 0, 0);  
  
  // 返回零点时间戳  
  return startOfDay.getTime();  
}  
  
// 示例使用  
const now = new Date();  
const startOfDayTimestamp = convertToStartOfDay(now);  
const selectedDateAtom = atom(new Date(startOfDayTimestamp));

export const useSelectedDate = () => {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);

  return {
    selectedDate,
    setSelectedDate,
  };
};
