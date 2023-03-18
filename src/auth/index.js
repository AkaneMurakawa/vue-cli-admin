const SA_TOKEN = "satoken"

/**
 * 授权认证
 */
export const auth = {
    getSatoken() {
        return sessionStorage.getItem(SA_TOKEN);
    },
    isLoggedIn() {
        return sessionStorage.getItem(SA_TOKEN) != null;
    },
    login(satoken) {
        sessionStorage.setItem(SA_TOKEN, satoken);
    },
    logout() {
        sessionStorage.removeItem(SA_TOKEN);
    }
}