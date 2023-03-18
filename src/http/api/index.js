import requests from "@/http/axios";

/**
 * 统一API封装，会绑定到Vue.prototype.$API
 */
export default class Api {
    /**
     * this.$API.POST(url, data)
     */
    POST(url, data) {
        const config = {
            method: 'POST',
            url,
            data
        }
        return requests(config);
    }

    /**
     * this.$API.GET(url, params)
     */
    GET(url, params) {
        const config = {
            method: 'GET',
            url,
            params
        }
        return requests(config);
    }
}