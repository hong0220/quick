/********************************************
 * 玉琴蝶园之ExtJs例子资料
 * 作者：迷蝶
 * 创建时间：2010-05-18
 * 联系方式：
 * 		E-Mail：leader1212@sina.com.cn
 * 		  CSDN：http://hi.csdn.net/leadergg
 * 说明：如需直接使用本站的例子代码，请保留此说明
 * 
 ******************************************/
Ext.ux.SyncLoader = function(url, cachingOff, responseXML) {
	var activeX = Ext.lib.Ajax.activeX;
	var isLocal = (document.location.protocol == 'file:');
	var conn;

	try {
		if (Ext.isIE7 && isLocal) {
			throw ("IE7forceActiveX");
		}
		conn = new XMLHttpRequest();
	} catch (e) {
		for (var i = 0; i < activeX.length; ++i) {
			try {
				conn = new ActiveXObject(activeX[i]);
				break;
			} catch (e) {
			}
		}
	}
	// Should we disable caching
	if (!cachingOff)
		url += (url.indexOf('?') != -1 ? '&' : '?') + '_dc='
				+ (new Date().getTime());
	try {
		conn.open('GET', url, false);
		conn.send(null);
		if ((isLocal && conn.responseText.length != 0)
				|| (conn.status !== undefined && conn.status >= 200 && conn.status < 300)) {
			return responseXML ? conn.responseXML : conn.responseText;
		}
	} catch (e) {
	}
	return false;
} 

/**
 * 加载javascript，使用url作为引入js的id
 * @param {String} url 引入js的rul
 * @param {Boolean} cachingOff 是否从缓存中获取,默认不使用
 */
Ext.ux.ScriptLoader = function(url, cachingOff) {
	if (url && !document.getElementById(url)) {
		var content = Ext.ux.SyncLoader(url, cachingOff);
		if (content === false)
			return false;
		var head = document.getElementsByTagName("head")[0];
		var script = document.createElement("script");
		try {
			script.text = content;
		} catch (e) {
			script.appendChild(content);
		}
		script.setAttribute("type", "text/javascript");
		script.setAttribute("id", url);
		head.appendChild(script);
		return true;
	}
	return false;
}
/**
 * 加载样式表 
 * @param {String}url 样式表url
 */
Ext.ux.CssLoader = function(url) {
	if (url && !document.getElementById(url)) {
		var head = document.getElementsByTagName("head")[0];
		var link = document.createElement("link");
		link.setAttribute("id", url);
		link.setAttribute("type", "text/css");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", url);
		head.appendChild(link);
		return true;
	}else{
		return false;
	}
	
}