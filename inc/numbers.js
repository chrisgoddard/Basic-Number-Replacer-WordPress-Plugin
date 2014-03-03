/*
 *	Numbers.js Number Replacer
 *	Odd Dog Media - Chris Goddard
 *	Version 1.1 -
 */

/*! url - v1.8.6 - 2013-11-22 */window.url=function(){function a(a){return!isNaN(parseFloat(a))&&isFinite(a)}return function(b,c){var d=c||window.location.toString();if(!b)return d;b=b.toString(),"//"===d.substring(0,2)?d="http:"+d:1===d.split("://").length&&(d="http://"+d),c=d.split("/");var e={auth:""},f=c[2].split("@");1===f.length?f=f[0].split(":"):(e.auth=f[0],f=f[1].split(":")),e.protocol=c[0],e.hostname=f[0],e.port=f[1]||("https"===e.protocol.split(":")[0].toLowerCase()?"443":"80"),e.pathname=(c.length>3?"/":"")+c.slice(3,c.length).join("/").split("?")[0].split("#")[0];var g=e.pathname;"/"===g.charAt(g.length-1)&&(g=g.substring(0,g.length-1));var h=e.hostname,i=h.split("."),j=g.split("/");if("hostname"===b)return h;if("domain"===b)return/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(h)?h:i.slice(-2).join(".");if("sub"===b)return i.slice(0,i.length-2).join(".");if("port"===b)return e.port;if("protocol"===b)return e.protocol.split(":")[0];if("auth"===b)return e.auth;if("user"===b)return e.auth.split(":")[0];if("pass"===b)return e.auth.split(":")[1]||"";if("path"===b)return e.pathname;if("."===b.charAt(0)){if(b=b.substring(1),a(b))return b=parseInt(b,10),i[0>b?i.length+b:b-1]||""}else{if(a(b))return b=parseInt(b,10),j[0>b?j.length+b:b]||"";if("file"===b)return j.slice(-1)[0];if("filename"===b)return j.slice(-1)[0].split(".")[0];if("fileext"===b)return j.slice(-1)[0].split(".")[1]||"";if("?"===b.charAt(0)||"#"===b.charAt(0)){var k=d,l=null;if("?"===b.charAt(0)?k=(k.split("?")[1]||"").split("#")[0]:"#"===b.charAt(0)&&(k=k.split("#")[1]||""),!b.charAt(1))return k;b=b.substring(1),k=k.split("&");for(var m=0,n=k.length;n>m;m++)if(l=k[m].split("="),l[0]===b)return l[1]||"";return null}}return""}}(),"undefined"!=typeof jQuery&&jQuery.extend({url:function(a,b){return window.url(a,b)}});

/*! Cookies.js - 0.3.1; Copyright (c) 2013, Scott Hamper; http://www.opensource.org/licenses/MIT */
(function(e){"use strict";var a=function(b,d,c){return 1===arguments.length?a.get(b):a.set(b,d,c)};a._document=document;a._navigator=navigator;a.defaults={path:"/"};a.get=function(b){a._cachedDocumentCookie!==a._document.cookie&&a._renewCache();return a._cache[b]};a.set=function(b,d,c){c=a._getExtendedOptions(c);c.expires=a._getExpiresDate(d===e?-1:c.expires);a._document.cookie=a._generateCookieString(b,d,c);return a};a.expire=function(b,d){return a.set(b,e,d)};a._getExtendedOptions=function(b){return{path:b&&
b.path||a.defaults.path,domain:b&&b.domain||a.defaults.domain,expires:b&&b.expires||a.defaults.expires,secure:b&&b.secure!==e?b.secure:a.defaults.secure}};a._isValidDate=function(b){return"[object Date]"===Object.prototype.toString.call(b)&&!isNaN(b.getTime())};a._getExpiresDate=function(b,d){d=d||new Date;switch(typeof b){case "number":b=new Date(d.getTime()+1E3*b);break;case "string":b=new Date(b)}if(b&&!a._isValidDate(b))throw Error("`expires` parameter cannot be converted to a valid Date instance");
return b};a._generateCookieString=function(b,a,c){b=encodeURIComponent(b);a=(a+"").replace(/[^!#$&-+\--:<-\[\]-~]/g,encodeURIComponent);c=c||{};b=b+"="+a+(c.path?";path="+c.path:"");b+=c.domain?";domain="+c.domain:"";b+=c.expires?";expires="+c.expires.toUTCString():"";return b+=c.secure?";secure":""};a._getCookieObjectFromString=function(b){var d={};b=b?b.split("; "):[];for(var c=0;c<b.length;c++){var f=a._getKeyValuePairFromCookieString(b[c]);d[f.key]===e&&(d[f.key]=f.value)}return d};a._getKeyValuePairFromCookieString=
function(b){var a=b.indexOf("="),a=0>a?b.length:a;return{key:decodeURIComponent(b.substr(0,a)),value:decodeURIComponent(b.substr(a+1))}};a._renewCache=function(){a._cache=a._getCookieObjectFromString(a._document.cookie);a._cachedDocumentCookie=a._document.cookie};a._areEnabled=function(){return "1"===a.set("cookies.js",1).get("cookies.js")};a.enabled=a._areEnabled();"function"===typeof define&&define.amd?define(function(){return a}):"undefined"!==typeof exports?("undefined"!==
typeof module&&module.exports&&(exports=module.exports=a),exports.Cookies=a):window.Cookies=a})();

/* number replacer */
var pat = /(\+?1[-\s.])?\(?(\d{3})\)?[-\s.]?(\d{3})[-\s.]?(\d{4})/g;
function replaceNumbers(replacement) {
	var pageHTML = document.body.innerHTML;
	var newPage = pageHTML.replace(pat, replacement);
	document.body.innerHTML = newPage;
}

function replaceNumbersSelector(replacement, selector) {
	var instances = document.getElementsByClassName(selector);
	for (var i = 0; i < instances.length; i++) {
		var item = instances[i].innerHTML;
		var newitem = item.replace(pat, replacement);
		document.body.getElementsByClassName(selector)[i].innerHTML = newitem;
	}
}

function runreplacer() {
	
	if (selector == 0) {
		// replace all numbers
		replaceNumbers(number);
	} else {
		// replace numbers within class
		replaceNumbersSelector(number, selector);
	}
}
var source = url('?source');
var campaign = url('?campaign');
if ((source != null) && (campaign != null)) {
	var number = campaigns[campaign][source];
	runreplacer(number);
	Cookies.set('_uwcall', selector + ':' + number, {
		expires: 60 * 60 * 24 * 14
	}); // 2 week cookie
} else {
	var cookieNumber = Cookies('_uwcall');
	if (cookieNumber) {
		cookieNumber = cookieNumber.split(':');
		selector = cookieNumber[0];
		number = cookieNumber[1];
		runreplacer(number);
	}
}