/*! auth.js 1.0.3 */
(function(){
// Set Global YAHOO
YAHOO = typeof YAHOO === "undefined" ? {} : YAHOO;
YAHOO.JP = typeof YAHOO.JP === "undefined" ? {} : YAHOO.JP;
YAHOO.JP.yconnect = typeof YAHOO.JP.yconnect === "undefined" ? {} : YAHOO.JP.yconnect;

YAHOO.JP.yconnect.Util = {
    /**
     * 指定したクラス名に適合する要素の配列を返す
     * @methodOf YAHOO.JP.yconnect
     * @name getElementsByClassName
     * @static
     * @param {Object} el クラスを取得する要素
     * @param {string} searchClass 検索するクラス
     * @param {string} tag クラスの取得対象の要素種別
     * @return {array} returnArr searchClass名を持つ配列
     */
    getElementsByClassName: function(el, searchClass, tag) {
        if (el) {
            var returnArr = [], els, pattern, i;
            if (typeof document.getElementsByClassName === "function") {
                returnArr = el.getElementsByClassName(searchClass, tag);
            } else {
                tag = tag || '*';
                els = el.getElementsByTagName(tag);
                pattern = new RegExp('(^|\\s)' + searchClass + '(\\s|$)');
                for (i = 0; i < els.length; i = i + 1) {
                    if (pattern.test(els[i].className)) {
                        returnArr.push(els[i]);
                    }
                }
            }
            return returnArr;
        }
    },
    addListener: function(oElm, sType, func, cap) {
        if (!oElm) { return false; }
        if (oElm.addEventListener) {
            oElm.addEventListener(sType, func, cap);
        } else if (oElm.attachEvent) {
            oElm.attachEvent("on"+sType, func);
        } else {
            return false;
        }
        return false;
    },
    addClass: function(el, className) {
        if (el) {
            if (!el.className.match(className)) {
                el.className += ' ' + className;
            }
        }
    },
    removeClass: function(elem, value) {
        var obj = (typeof elem === "string")? document.getElementById(elem) : elem ,
        myClassList,
        i,
        len,
        s,
        myNewClass = [];
        if(obj) {
            myClassList = obj.className.split(" ");
            for(i=0,len=myClassList.length; i<len; i++){
                s = myClassList[i];
                if(s !== value && s !== ''){
                    myNewClass.push(s);
                }
            }
            obj.className = myNewClass.join(" ");
        }
    },

    /**
     * イベントをキャンセルする
     * @methodOf YAHOO.JP.lib.mics
     * @name preventDefault
     * @static
     * @param {Object} e イベントオブジェクト
     */
    preventDefault: function (e) {
        var eo = e || window.event;
        if (eo.preventDefault) {
            eo.preventDefault();
        } else { 
            eo.returnValue = false;
        }
    },

    /**
     * イベントの伝播をキャンセルする
     * @methodOf YAHOO.JP.lib.mics
     * @name stopPropagation
     * @static
     * @param {Object} e イベントオブジェクト
     */
    stopPropagation: function (e) {
        var eo = e || window.event;
        if (eo.stopPropagation) {
            eo.stopPropagation();
        } else { 
            eo.cancelBubble = false;
        }
    },

    escapeHtml: function(str) {
        var ret = str;
        if (typeof str !== "string") {
            return str;
        }
        ret = ret.replace(/&/g, "&amp;");
        ret = ret.replace(/</g, "&lt;");
        ret = ret.replace(/>/g, "&gt;");
        ret = ret.replace(/"/g, "&quot;");
        ret = ret.replace(/'/g, "&#39;");
        return ret;
    }
};

/**
 * ボタンクラス
 * @class Button
 * @methodOf YAHOO.JP.yconnect
 * @param {Object} setting 設定項目
 */
YAHOO.JP.yconnect.Button = function(setting) {
    if (!setting) {
        setting = {};
    }
    this.type        = "";
    this.url         = "";
    this.className   = "";
    this.yimg        = "";
    this.text        = "";
    this.width       = 0;
    this.height      = 0;
    this.textType    = "";
    this.time        = "";
    this.template    = setting.template || "";
    this.getTemplate = function() {};
};
YAHOO.JP.yconnect.Button.prototype = {
    init: function(setting) {
        var i,
            date,
            template,
            btnAreas;
        if (!setting) {
            setting = {};
        }
        this.type      = setting.type      || "a";
        this.url       = setting.url       || "";
        this.className = setting.className || "yconnectLogin";
        this.width     = setting.width     || 0;
        this.height    = setting.height    || 0;
        this.yimg      = document.location.protocol === "http:" ? "http://i.yimg.jp" : "https://s.yimg.jp";
        this.textType  = setting.textType  || "a";
        date = new Date();
        this.time = date.getTime();

        btnAreas = YAHOO.JP.yconnect.Util.getElementsByClassName(document, this.className);
        if (btnAreas.length === 0) {
            return;
        }
        template = this.getTemplate();
        for (i = 0; i < btnAreas.length; i++) {
            btnAreas[i].innerHTML = template;
        }
    }
};

/**
 * テキストボタンの実装
 * @class TextButton
 * @methodOf YAHOO.JP.yconnect
 * @param {Object} setting 設定項目
 */
YAHOO.JP.yconnect.TextButton = new YAHOO.JP.yconnect.Button({
    template: '<img src="{{yimg}}/images/login/btn/ymark_r_13_2x.png" width="27" height="15" alt="Yahoo! JAPAN" border="0" style="vertical-align:middle;margin-right:3px;"><a href="{{url}}" class="yjBtnTxtLink">{{text}}</a>'
});
YAHOO.JP.yconnect.TextButton.getTemplate = function() {
    var template;
    switch (this.type) {
        case "a":
            // ログイン
            this.text = decodeURI("%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3");
            break;
        case "b":
            // Yahoo! JAPAN IDでログイン
            this.text = decodeURI("Yahoo!%20JAPAN%20ID%E3%81%A7%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3");
            break;
        case "c":
            // ログインして自動入力
            this.text = decodeURI("%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3%E3%81%97%E3%81%A6%E8%87%AA%E5%8B%95%E5%85%A5%E5%8A%9B");
            break;
        default:
            this.text = "";
    }

    template = this.template;
    template = template.replace(/{{yimg}}/, this.yimg);
    template = template.replace(/{{text}}/, this.text);
    template = template.replace(/{{url}}/, this.url);
    return template;
};

/**
 * 画像ボタンの実装
 * @class ImageButton
 * @methodOf YAHOO.JP.yconnect
 * @param {Object} setting 設定項目
 */
YAHOO.JP.yconnect.ImageButton = new YAHOO.JP.yconnect.Button({
    template: '<a href="{{url}}" class="yjBtn{{type}}" style="width:{{width}}px;"><span class="yjBtnTxt" style="height:{{height}}px;line-height:{{height}}px;">{{text}}</span></a>'
});
YAHOO.JP.yconnect.ImageButton.getTemplate = function() {
    var template,
        height,
        type = this.type.toUpperCase();
    if (this.textType === "a") {
        // ログイン
        this.text = decodeURI("%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3");
    } else if (this.textType === "b") {
        // ログインして自動入力
        this.text = decodeURI("%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3%E3%81%97%E3%81%A6%E8%87%AA%E5%8B%95%E5%85%A5%E5%8A%9B");
    }
    if (this.width < 76 && this.height > 34) {
        height = this.height - 19;
        type = "Square" + type;
    } else if (this.width < 160 || this.height < 28) {
        height = this.height - 2;
        if (this.width < 110 || this.height < 24) {
            type = "XSmall" + type;
        } else {
            type = "Small" + type;
        }
    } else {
        height = this.height - 2;
    }
    // escape html
    type        = YAHOO.JP.yconnect.Util.escapeHtml(type);
    this.width  = YAHOO.JP.yconnect.Util.escapeHtml(this.width);
    this.height = YAHOO.JP.yconnect.Util.escapeHtml(this.height);

    template = this.template;
    template = template.replace(/{{text}}/, this.text);
    template = template.replace(/{{type}}/, type);
    template = template.replace(/{{url}}/, this.url);
    template = template.replace(/{{width}}/, this.width-2);
    template = template.replace(/{{height}}/g, height);
    return template;
};

/**
 * iframe内ボタンの実装
 * @class ImageButton
 * @methodOf YAHOO.JP.yconnect
 * @param {Object} setting 設定項目
 */
YAHOO.JP.yconnect.IFrameButton = new YAHOO.JP.yconnect.Button({
    template: '<iframe src="{{url}}" frameborder="0" scrolling="no" allowtransparency="true" style="border:none;visibility:visible;width:{{width}}px;height:{{height}}px;"></iframe>'
});
YAHOO.JP.yconnect.IFrameButton.getTemplate = function() {
    var template;

    // escape html
    this.width  = YAHOO.JP.yconnect.Util.escapeHtml(this.width);
    this.height = YAHOO.JP.yconnect.Util.escapeHtml(this.height);

    template = this.template;
    template = template.replace(/{{url}}/, this.url);
    template = template.replace(/{{width}}/, this.width);
    template = template.replace(/{{height}}/, this.height);
    return template;
};

/**
 * Authorization
 * @module Authorization
 */
YAHOO.JP.yconnect.Authorization = (function() {
    var Util = YAHOO.JP.yconnect.Util,
        Self,
        MESSAGE_ORIGIN = "http://design.corp.yahoo.co.jp",
        TARGET_ORIGIN = "http://design.corp.yahoo.co.jp",
        _button = {
            format: "",
            type: "",
            width: 0,
            height: 0
        },
        _redirectUri = "";

    function _createButton(setting) {
        var button = {
                format: "",
                type: "",
                className: "",
                width: 0,
                height: 0,
                textType: ""
            },
            param = {
                responseType: "",
                clientId: "",
                redirectUri: "",
                state: "",
                display: "",
                prompt: "",
                scope: "",
                nonce: ""
            },
            url,
            css;

        button.format      = setting.button.format              || "image";
        button.type        = setting.button.type                || "a";
        button.width       = setting.button.width               || 196;
        button.height      = setting.button.height              || 38;
        button.className   = setting.button.className           || "yconnectLogin";
        button.textType    = setting.button.textType            || "a";
        param.responseType = setting.authorization.responseType || "code id_token";
        param.clientId     = setting.authorization.clientId     || "";
        param.state        = setting.authorization.state        || "";
        param.scope        = setting.authorization.scope        || "";
        param.nonce        = setting.authorization.nonce        || "";
        param.redirectUri  = encodeURIComponent(setting.authorization.redirectUri) || "";
        param.display      = "popup";
        param.prompt       = setting.authorization.prompt       || "";

        url = "https://auth.login.yahoo.co.jp/yconnect/v1/authorization?";
        url += "response_type=" + param.responseType.replace(" ", "+");
        url += "&client_id="    + param.clientId;
        url += "&redirect_uri=" + param.redirectUri;
        url += "&state="        + param.state;
        url += "&scope="        + param.scope.replace(" ", "+");
        url += "&nonce="        + param.nonce;
        url += "&prompt="       + param.prompt.replace(" ", "+");
        url += "&display=";

        css = document.createElement('link'),
        css.href = "https://s.yimg.jp/images/login/yconnect/auth/1.0.0/makeButton-min.css";
        css.type = "text/css";
        css.rel  = "stylesheet";
        document.getElementsByTagName('head')[0].appendChild(css);

        if (button.format === "image") {
            YAHOO.JP.yconnect.ImageButton.init({
                type: button.type,
                className: button.className,
                width: button.width,
                height: button.height,
                url: url,
                textType: button.textType
            });
        } else {
            YAHOO.JP.yconnect.TextButton.init({
                type: button.type,
                className: button.className,
                url: url
            });
        }
    }
    function _redirect(res) {
        var url = "";
        url = _redirectUri + "?";
        url += "code=" + res.Result.code;
        url += "&state=" + res.Result.state;
        /*
        console.log("redirect_uri: " + _redirectUri);
        console.log("code: " + res.Result.code);
        console.log("state: " + res.Result.state);
        */
        url = encodeURI(url);
        location.href = url;
    }

    return {
        init: function(setting) {
            var i,
                btnAreas,
                iframeBtnClassName = "",
                BTN_URL = "http://design.corp.yahoo.co.jp/login/yconnect/auth/1.0.3/button.html?dev=1";

            if (!setting) {
                setting = {};
                if (!setting.button) {
                    setting.button = {};
                }
                if (!setting.authorization) {
                    setting.authorization = {};
                }
            }
            Self = YAHOO.JP.yconnect.Authorization;

            // エラーハンドラーの設定
            Self.onError  = setting.onError  || function(res) {console.log("error");};
            Self.onCancel = setting.onCancel || function(res) {console.log("cancel");};

            // stateとnonceのチェック
            if (typeof setting.authorization.state === "undefined" || setting.authorization.state === "") {
                // stateの値がない
                Self.onError(JSON.parse('{"Error":{"error":"invalid_request","errorDescription":"' + 'no value given for state' + '"}}'));
                return;
            }
            if (typeof setting.authorization.nonce === "undefined" || setting.authorization.nonce === "") {
                // nonceの値がない
                Self.onError(JSON.parse('{"Error":{"error":"invalid_request","errorDescription":"' + 'no value given for nonce' + '"}}'));
                return;
            }

            // set params
            _button.format      = setting.button.format             || "image";
            _button.type        = setting.button.type               || "a";
            _button.width       = setting.button.width-0            || 196;
            _button.height      = setting.button.height-0           || 38;
            _button.textType    = setting.button.textType           || "a";
            _redirectUri        = setting.authorization.redirectUri || "";    // サーバー側でチェックするためencodeURIしない
            iframeBtnClassName  = setting.button.className          || "yconnectLogin";

            // text button
            if (_button.format === "text" && _button.type === "a") {
                _button.width = 110;
                _button.height = 25;
            } else if(_button.format === "text" && _button.type === "b") {
                _button.width = 260;
                _button.height = 25;
            }

            // IE7, iOS5
            if (!window.postMessage || typeof JSON === "undefined") {
                _createButton(setting);
                return;
            }

            YAHOO.JP.yconnect.IFrameButton.init({
                url: BTN_URL,
                className: iframeBtnClassName,
                width: _button.width,
                height: _button.height,
                textType: _button.textType
            });
            btnAreas = Util.getElementsByClassName(document, iframeBtnClassName);
            if (btnAreas.length === 0) {
                return;
            }
            for (i = 0; i < btnAreas.length; i++) {
                btnAreas[i].getElementsByTagName("iframe")[0].onload = function() {
                    this.contentWindow.postMessage('{"YConnect":' + JSON.stringify(setting) + '}', TARGET_ORIGIN);
                    Util.addClass(this, "loaded");
                }
            }
            // 読み込まれてなければ1秒後に再読み込み
            window.setTimeout( function() {
                for (i = 0; i < btnAreas.length; i++) {
                    if (!btnAreas[i].getElementsByTagName("iframe")[0].className.match(/loaded/)) {
                        btnAreas[i].getElementsByTagName("iframe")[0].contentWindow.postMessage('{"YConnect":' + JSON.stringify(setting) + '}', TARGET_ORIGIN);
                    }
                }
            }, 1000);
            Util.addListener(window, "message", Self.onMessage, false);
        },
        onMessage: function(e) {
            var ev = e || window.event,
                res;
            if (ev.origin !== MESSAGE_ORIGIN) {
                return;
            }
            res = JSON.parse(ev.data);
            if (res.Result) {
                if (res.Result.code) {
                    _redirect(res);
                } else {
                    Self.onCancel(res);
                }
            } else {
                Self.onError(res);
            }
        },
        onError: function(res) {
            // error
        },
        onCancel: function(res) {
            // cancel
        }
    };
}());

window.yconnectInit();

})();
