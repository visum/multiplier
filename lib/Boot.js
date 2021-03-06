﻿(function () {

    var global = (function () { return this; }());

    var emptyFn = function () { };

    var isIE8 = function () {
        return document.all && !document.addEventListener;
    };

    if (!Object.hasOwnProperty("keys")) {
        Object.keys = function (object) {
            var name;
            var result = [];
            for (name in object) {
                if (Object.prototype.hasOwnProperty.call(object, name)) {
                    result.push(name);
                }
            }

            return result;
        };
    }

    if (!Array.hasOwnProperty("isArray")) {
        Array.isArray = function (value) {
            return Object.prototype.toString.call(value) === "[object Array]";
        };
    }

    if (!Array.prototype.hasOwnProperty("every")) {
        Array.prototype.every = function (fn, thisp) {
            var i;
            var length = this.length;
            for (i = 0; i < length; i += 1) {
                if (this.hasOwnProperty(i) && !fn.call(thisp, this[i], i, this)) {
                    return false;
                }
            }
            return true;
        };
    }

    if (!Array.prototype.hasOwnProperty("some")) {
        Array.prototype.some = function (fn, thisp) {
            var i;
            var length = this.length;
            for (i = 0; i < length; i += 1) {
                if (this.hasOwnProperty(i) && fn.call(thisp, this[i], i, this)) {
                    return true;
                }
            }
            return false;
        };
    }

    if (!Array.prototype.hasOwnProperty("filter")) {
        Array.prototype.filter = function (fn, thisp) {
            var i;
            var length = this.length;
            var result = [];
            var value;

            for (i = 0; i < length; i += 1) {
                if (this.hasOwnProperty(i)) {
                    value = this[i];
                    if (fn.call(thisp, value, i, this)) {
                        result.push(value);
                    }
                }
            }
            return result;
        };
    }

    if (!Array.prototype.hasOwnProperty("indexOf")) {
        Array.prototype.indexOf = function (searchElement, fromIndex) {
            var i = fromIndex || 0;
            var length = this.length;

            while (i < length) {
                if (this.hasOwnProperty(i) && this[i] === searchElement) {
                    return i;
                }
                i += 1;
            }
            return -1;
        };
    }

    if (!Array.prototype.hasOwnProperty("lastIndexOf")) {
        Array.prototype.lastIndexOf = function (searchElement, fromIndex) {
            var i = fromIndex;
            if (typeof i !== "number") {
                i = length - 1;
            }

            while (i >= 0) {
                if (this.hasOwnProperty(i) && this[i] === searchElement) {
                    return i;
                }
                i -= 1;
            }
            return -1;
        };
    }

    if (!Array.prototype.hasOwnProperty("map")) {
        Array.prototype.map = function (fn, thisp) {
            var i;
            var length = this.length;
            var result = [];

            for (i = 0; i < length; i += 1) {
                if (this.hasOwnProperty(i)) {
                    result[i] = fn.call(thisp, this[i], i, this);
                }
            }

            return result;
        };
    }

    if (!Array.prototype.hasOwnProperty("reduceRight")) {
        Array.prototype.reduceRight = function (fn, initialValue) {
            var i = this.length - 1;

            while (i >= 0) {
                if (this.hasOwnProperty(i)) {
                    initialValue = fn.call(undefined, initialValue, this[i], i, this);
                }
                i -= 1
            }

            return initialValue;
        };
    }

    if (!Array.prototype.hasOwnProperty("reduce")) {
        Array.prototype.reduce = function (fn, initialValue) {
            var i;
            var length = this.length;

            for (i = 0; i < length; i += 1) {
                if (this.hasOwnProperty(i)) {
                    initialValue = fn.call(undefined, initialValue, this[i], i, this);
                }
            }

            return initialValue;
        };
    }

    if (!Array.prototype.hasOwnProperty("indexOf")) {
        Array.prototype.indexOf = function (searchElement, fromIndex) {
            var i = fromIndex || 0;
            var length = this.length;

            while (i < length) {
                if (this.hasOwnProperty(i) && this[i] === searchElement) {
                    return i;
                }
                i += 1;
            }
            return -1;
        };
    }

    if (!Array.prototype.except) {
        Array.prototype.except = function (array) {
            array = Array.isArray(array) ? array : [];
            return this.filter(function (n) {
                return array.indexOf(n) === -1;
            });
        };
    }

    if (!Array.prototype.hasOwnProperty("forEach")) {
        Array.prototype.forEach = function (fn, thisp) {
            var i;
            var length = this.length;

            for (i = 0; i < length; i += 1) {
                if (this.hasOwnProperty(i)) {
                    fn.call(thisp, this[i], i, this);
                }
            }
        };
    }


    var head = document.getElementsByTagName('head')[0];

    var loadLocalJsonFile = function (url, settings) {
        settings = settings || {};
        settings.headers = settings.headers || {};
        var callback = settings.onSuccess;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (event) {
            if (xhr.readyState == 4) {
                if (xhr.status == 0 || (xhr.status < 300 && xhr.status >= 200)) {
                    try {
                        var data = JSON.parse(xhr.responseText);
                    } catch (e) {
                        throw new Error("Parse Error.");
                    }

                    callback(data);
                } else {
                    throw new Error(xhr.status);
                }
            }
        }
        try {
            xhr.open("GET", url, true);
            Object.keys(settings.headers).forEach(function (key) {
                xhr.setRequestHeader(key, settings.headers[key]);
            });

            xhr.send();
        } catch (e) {
            throw new Error("Url: \"" + url + "\" couldn't be retrieved because CORS isn't enabled, or you are working in ie 8 and below.");
        }
    };

    var parseValues = function (valueString) {
        var obj = {};
        var values = valueString.split("=");
        obj[values[0]] = values[1];

        return obj;
    };

    var makeArray = function (arrayLike) {
        var array = [];

        for (var x = 0 ; x < arrayLike.length; x++) {
            array.push(arrayLike[x]);
        }

        return array;
    };

    var concatPaths = function () {
        var args = Array.prototype.slice.call(arguments, 0);

        return args.reduce(function (value, nextUrl, index) {

            while (nextUrl.length > 0 && nextUrl.lastIndexOf("/") === nextUrl.length - 1) {
                nextUrl = nextUrl.substring(0, nextUrl.length - 1);
            }

            if (index > 0) {
                while (nextUrl.indexOf("/") === 0) {
                    nextUrl = nextUrl.substring(1, nextUrl.length);
                }
            }

            if (index > 0) {
                return value + "/" + nextUrl
            } else {
                return nextUrl;
            }

        }, "");
    };

    var loadScript = function (url, callback) {
        // All of this is pretty weird because of browser caching etc.
        var script = document.createElement("script");
        script.async = true;
        script.src = url;

        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = function () {

            if (!script.readyState || /loaded|complete/.test(script.readyState)) {

                // Handle memory leak in IE
                script.onload = script.onreadystatechange = null;
                script.onerror = null;

                // Remove the script
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }

                // Dereference the script
                script = null;

                // Callback if not abort
                callback();
            }
        };

        script.onerror = function () {
            throw new Error("Failed to load: \"" + url + "\".");
        };

        if (head.children.length > 0) {
            head.insertBefore(script, head.firstChild);
        } else {
            head.appendChild(script);
        }
    };

    var prependCss = function (url, callback) {
        callback = callback || function () { };

        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;

        // This is as ugly as IE 8 is.
        // We hate... I mean hate IE 8.
        if (isIE8()) {

            link.onreadystatechange = function () {
                if (link.readyState == 'complete') {
                    callback();
                }
            };

        } else {

            link.onerror = function () {
                throw new Error("Couldn't find css at url: " + url);
            };
            link.onload = callback;

        }

        if (head.children.length > 0) {
            head.insertBefore(link, head.firstChild);
        } else {
            head.appendChild(link);
        }
    };

    var configureCss = function (cssConfig) {
        var files = cssConfig.files || [];
        files.forEach(function (file) {
            prependCss(files);
        });
    };

    var configureComponents = function (componentsConfig) {
        if (Array.isArray(componentsConfig.configs)) {
            componentsConfig.configs.forEach(function (config) {
                var script = document.createElement("script");
                script.setAttribute("root", config.root)
                script.type = "components/config";
                script.src = config.path;
                head.appendChild(script);
            });
        }

        if (componentsConfig.aliases) {
            var script = document.createElement("script");
            script.type = "components/config";
            script.innerText(JSON.stringify({ aliases: components.aliases }));
            head.appendChild(script);
        }
    };

    var configureBase = function (baseConfig) {
        var objects = baseConfig.objects || {};
        var namespaces = baseConfig.namespaces || {};
        var root = baseConfig.root;

        BASE.require.loader.setRoot(root);

        Object.keys(objects).forEach(function (key) {
            BASE.require.loader.setObject(key, objects[key]);
        });

        Object.keys(namespaces).forEach(function (key) {
            BASE.require.loader.setNamespace(key, namespaces[key]);
        });
    };

    var load = function (config) {
        var base = config.base || {};
        var css = config.css || {};
        var components = config.components || {};
        var baseUrl = base.path || "BASE.js";

        var minFile = config.minFile;
        var componentMinFile = config.componentsMin;

        configureComponents(components);
        configureCss(css);

        var init = function () {
            BASE.require(["BASE.web.components", "FastClick", "jQuery"], function () {
                $(function () {
                    FastClick.attach(document.body);
                });
            });
        };

        loadScript(baseUrl, function () {
            configureBase(base);

            var finish = function () {
                if (minFile) {
                    loadScript(minFile, init);
                } else {
                    init();
                }
            };

            if (componentMinFile) {
                loadLocalJsonFile(componentMinFile, {
                    onSuccess: function (componentHash) {
                        _componentCache = componentHash;
                        finish();
                    }
                });
            } else {
                finish();
            }

        });
    };

    var handlers = {
        "platform-config": function (value, metaTag) {
            loadLocalJsonFile(value, {
                onSuccess: function (data) {

                    load(data);

                }
            });
        }
    };

    var allMetaTags = document.getElementsByTagName("meta");

    makeArray(allMetaTags).forEach(function (metaTag) {

        Object.keys(handlers).forEach(function (handlerName) {
            if (metaTag.getAttribute("name") === handlerName) {
                handlers[handlerName](metaTag.getAttribute("content"), metaTag);
            }
        });

    });

	var onDeviceReady = function () {
        makeArray(allMetaTags).forEach(function (metaTag) {

            Object.keys(handlers).forEach(function (handlerName) {
                if (metaTag.getAttribute("name") === handlerName) {
                    handlers[handlerName](metaTag.getAttribute("content"), metaTag);
                }
            });

        });        
    };

    document.addEventListener("deviceready", onDeviceReady, false);


}());

/*

{
    "components": {
        "configs": [
            {
                "path": "someFolder/to/components/components.json"
                "root": "someFolder/to/components"
            }
        ]
    },
    "css": {
       "files": ["lib/weblib/css/bootstrap.css"]
    },
    "base": {
        "path": "lib/weblib/js/BASE.js",
        "namespaces": {
            "components": "lib/weblib/components",
            "app":"app"
        },
        "objects": {
            "jQuery":"/Found/Somewhere/Otherthan/normal/jQuery.js"
        },
        "root": "lib/weblib/js"
    }
}

*/