// 存
export function setToken(tokenKey, token) {
    return localStorage.setItem(tokenKey, token);
}
// 取
export function getToken(tokenKey) {
    return localStorage.getItem(tokenKey);
}
// 删
export function removeToken(tokenKey) {
    return localStorage.removeItem(tokenKey);
}