import {
    formatTime,
    getLabel
} from "./formatter";

/**
 *  常用工具，会绑定到Vue.prototype.$utils
 * this.$utils.formatTime(time)
 */
export default class utils {

    constructor() {
        this.formatTime = formatTime;
        this.getLabel = getLabel;
    }
}