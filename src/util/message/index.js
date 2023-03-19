import {
    Message
} from 'element-ui';

/**
 * 统一消息提示，会绑定到Vue.prototype.$message
 * this.$messsage(response)
response = {
    code: '401',
    success: false,
    data: null,
    message: '未授权，请重新登录',
    'timestamp': 123456789,
    error: [{
            code: 'com_err_001',
            message: '邮编格式错误'
        },
        {
            code: 'com_err_002',
            message: 'POID格式错误'
        },
    ]
}
 * 
 */

export default function (response) {
    let message = response.message;
    if (response.success) {
        Message.success(message);
    } else {
        if (response.error) {
            message = response.error.map(e => e.message).join('<br/><br/>')
        }
        Message.error({
            dangerouslyUseHTMLString: true,
            message,
        });
    }
}