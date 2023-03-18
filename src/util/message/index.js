import {
    Message
} from 'element-ui';

/**
 * 统一消息提示，会绑定到Vue.prototype.$message
 */
export default function (response) {
    const message = response.message;
    if (response.success) {
        Message.success(message);
    } else {
        Message.error(message);
    }
}