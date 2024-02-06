import jsSHA from 'jssha';
// 假设我们有一个固定的午餐菜单  
const lunchMenu = [
    '麦当劳',
    '肯德基',
    '牛肉饭',
    '麦当劳',
    'EFC',
    '牛肉饭',
    '咬不得',
    '疆厨子',
    '小厨匠',
    '弥牛',
    '鸡公煲',
    '自由日',
    '麦当劳'
    // ... 可以添加更多选项  
];


// 伪随机函数，根据时间戳字符串选择午餐  
export function chooseLunchByTimestamp(timestampStr) {  
  // 创建一个新的 jsSHA 实例  
  const shaObj = new jsSHA('SHA-256', 'TEXT');  
  
  // 更新（即，计算哈希值）  
  shaObj.update(timestampStr);  
  
  // 计算哈希值（同步操作）  
  const hash = shaObj.getHash('HEX');  
  
  // 从哈希值中取得一个索引（模运算确保索引在菜单范围内）  
  const index = parseInt(hash.substring(0, 2), 16) % lunchMenu.length;  
  
  // 返回对应的午餐选项  
  return lunchMenu[index];  
}  