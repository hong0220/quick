/**
 * 创建cookie
 */
function setCookie(name, value, expires, path, domain, secure) {
    var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if (expires instanceof Date) {
        cookieText += '; expires=' + expires;
    }
    if (path) {
        cookieText += '; expires=' + expires;
    }
    if (domain) {
        cookieText += '; domain=' + domain;
    }
    if (secure) {
        cookieText += '; secure';
    }
    document.cookie = cookieText;
}

/**
 * 获取cookie
 */
function getCookie(name) {
    var cookieName = encodeURIComponent(name) + '=';
    var cookieStart = document.cookie.indexOf(cookieName);
    var cookieValue = null;
    if (cookieStart > -1) {
        var cookieEnd = document.cookie.indexOf(';', cookieStart);
        if (cookieEnd == -1) {
            cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    }
    return cookieValue;
}

/**
 * 删除cookie
 */
function unsetCookie(name) {
    document.cookie = name + "= ; expires=" + new Date(0);
}

/**
 * 获取UA
 */
function whatBrowser() {
    document.Browser.Name.value = navigator.appName;
    document.Browser.Version.value = navigator.appVersion;
    document.Browser.Code.value = navigator.appCodeName;
    document.Browser.Agent.value = navigator.userAgent;
}