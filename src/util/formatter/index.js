// 常用工具封装
import Constant from "@/common/constant";
import moment from "moment/moment";

/**
 * 格式化时间戳
 */
export function formatTime(timestamp, format) {
    return moment(timestamp).format(format || 'YYYY-MM-DD HH:mm:ss');
}

/**
 * 格式化选项
 */
export function formatOption(prop, value) {
    const arr = Constant[prop].filter(item => item.value === value);
    if (!arr) {
        return value;
    }
    const obj = arr[0];
    return this.$t(obj.i18) || obj.label;
}