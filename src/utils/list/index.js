/**
 * 寻找第一个
 */
export function findFirst(arr, key, value) {
    let result;
    arr.forEach(item => {
        if (item[key] === value) {
            result = item;
            return;
        }
        if (item.children?.length > 0) {
            let chilrdResult = findFirst(item.children, key, value);
            if (chilrdResult) {
                result = chilrdResult;
                return;
            }
        }
    })
    return result;
}

/**
 * 匹配
 */
export function anyMatch(arr, key, value) {
    let result = false;
    arr.forEach(item => {
        if (item[key] === value) {
            result = true;
            return;
        }
    })
    return result;
}

/**
 * 拷贝对象
 */
export function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
};