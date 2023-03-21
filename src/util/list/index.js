const List = class {
    /**
     * 寻找第一个
     */
    static findFirst(arr, key, value) {
        let result;
        arr.forEach(item => {
            if (item[key] === value) {
                result = item;
                return;
            }
            if (item.children?.length > 0) {
                let chilrdResult = List.findFirst(item.children, key, value);
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
    static anyMatch(arr, key, value) {
        let result = false;
        arr.forEach(item => {
            if (item[key] === value) {
                result = true;
                return;
            }
        })
        return result;
    }
}

export default List;