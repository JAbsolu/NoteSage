import Cookies from 'js-cookie';

// Encode value using Base64 (btoa)
export const setCookie = (name, value, options = {}) => {
    Cookies.set(name, value, options);
}

// Decode value using Base64 (atob)
export const getCookie = (name) => {
    return Cookies.get(name);
}

// delete cookie
export const deleteCookie = (name) => {
    Cookies.remove(name);
}
