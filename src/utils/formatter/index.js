// 常用工具封装
import moment from "moment/moment";

/**
 * 格式化时间戳
 */
export function formatTime(timestamp, format) {
    return moment(timestamp).format(format || 'YYYY-MM-DD HH:mm:ss');
}

/**
 * 获取选项的标签
 * 在这里不直接处理国际化，避免this处理
 */
export function getLabel(option, value) {
    option.forEach(item => {
        if (item.value === value) {
            value = item.i18 || item.label || value;
            return;
        }
    })
    return value;
}