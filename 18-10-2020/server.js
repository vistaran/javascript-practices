var http = require('http');
var url = require('url');

var fn = (req, res) => {
    // var queryObj = url.parse(req.url, true).query;
    // console.log(queryObj.name);

    // var person = {
    //     'error': 'Not found'
    // };

    res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write(JSON.stringify(person));
    res.write('<h1>Hello! World!');
    res.end();
};

http.createServer(fn).listen(8080);