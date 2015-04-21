var express = require('express');

var app = express();

var port = 8080;
var ipaddress = "localhost";

var findLocalIP = function () {
    var os = require('os');
    var ifaces = os.networkInterfaces();
    var ipv4Addrs = [];
    for (var dev in ifaces) {
        ifaces[dev].forEach(function (details) {
            if (details.family == 'IPv4') {
                ipv4Addrs.push(details.address);
            }
        });
    }

    var tenAddrs = ipv4Addrs.filter(function (addr) {
        return addr.indexOf("10") === 0;
    });

    var returnAddr = tenAddrs.length > 0 ? tenAddrs[0] : ipv4Addrs[0];
    return returnAddr || "localhost";
};


app.use(express["static"](__dirname));
if (process.argv.length === 4) {
    ipaddress = process.argv[2];
    port = process.argv[3];
} else if (process.argv.length === 3) {
    ipaddress = process.argv[2];
} else {
    ipaddress = findLocalIP();
}
app.listen(port, ipaddress, function () {
    console.log("%s:%d", ipaddress, port);
});
