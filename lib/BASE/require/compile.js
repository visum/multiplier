﻿BASE.require([
    "BASE.async.Future",
    "BASE.async.Task"
], function () {
    var Future = BASE.async.Future;

    var GET = function (url, settings) {
        settings = settings || {};
        settings.headers = settings.headers || {};

        return new BASE.async.Future(function (setValue, setError) {

            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function (event) {
                if (xhr.readyState == 4) {
                    if (xhr.status < 300 && xhr.status >= 200) {
                        setValue(xhr.responseText);
                    } else {
                        var error = new Error(status);
                        error.xhr = xhr;
                        error.message = "Error";
                        setError(error);
                    }
                }
            }

            xhr.open("GET", url, true);
            Object.keys(settings.headers).forEach(function (key) {
                xhr.setRequestHeader(key, settings.headers[key]);
            });

            xhr.send(settings.data);
        });
    };


    BASE.require.compile = function () {
        ///<summary>
        ///A method that compiles all scripts that have been loaded with BASE.require to this point.
        ///</summary>
        ///<returns type="undefined" >
        ///Returns undefined, and open a new tab with the compiled file.
        ///</returns>

        return new Future(function (setValue, setError) {
            var dependencies = BASE.require.dependencyList;
            var task = new BASE.async.Task();

            dependencies.forEach(function (namespace) {
                if (namespace !== "BASE.require.compile" &&
                    namespace !== "Object" &&
                    namespace !== "Function" &&
                    namespace !== "Date" &&
                    namespace !== "Number" &&
                    namespace !== "Array") {
                    task.add(GET(BASE.require.loader.getPath(namespace)));
                }
            });

            task.start().whenAll(function (futures) {
                var compilation = [];
                futures.forEach(function (future) {
                    var src = future.value;
                    compilation.push((src || "") + ";");
                });

                setValue(compilation.join("\n\n"));

                //var encoded = encodeURI(compilation.join("\n"));
                //location.href = "data:application/javascript;charset=utf-8," + encoded;
            });

        });
    };


    var blacklist = {
        "BASE.require.compile": true,
        "BASE.async.Future": true,
        "BASE.async.Task": true,
        "BASE.util.Observable": true,
        "BASE.util.Observable": true,
        "BASE.util.Observer": true,
        "BASE.extend": true,
        "BASE.hasInterface": true,
        "BASE.Loader": true,
        "BASE.namespace": true,
        "BASE.isObject": true,
        "BASE.getObject": true,
        "BASE.clone": true,
        "BASE.assertNotGlobal": true,
        "Object": true,
        "Function": true,
        "Date": true,
        "Number": true,
        "Array": true
    };

    BASE.require.compile.getUris = function () {
        var dependencies = BASE.require.dependencyList;
        var result = [];

        dependencies.filter(function (namespace) {
            if (!blacklist[namespace]) {
                return true;
            }
            return false;
        }).forEach(function (namespace) {
            result.push(BASE.require.loader.getPath(namespace));
        });

        return result;
    };
});