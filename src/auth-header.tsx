export default function authHeader() {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    if (user && user.accessToken) {
        return 'Bearer ' + user.accessToken;
    } else {
        return "";
    }
}