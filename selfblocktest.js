//var http = require('http');
//var fs = require('fs');
//var path = require('path');
//var util = require('util');
//var qs = require('querystring');
var express = require('express');
 
//http.createServer(function (request, response) {
express.createServer().all('*',function (request, response) { 
    //console.log('request starting...');
     
    var filePath = '.' + request.url;
    var processtype = 'file';
    if (path.dirname(filePath) == './getdata' ) {
        processtype = 'getdata';
        var getcommand = path.basename(filePath);
    }
    else if (filePath == './') {
        filePath = './entrance.html';
    }
    else if (filePath == './lanwar.html') {
         if (request.method == 'POST') {
            var body = '';
            request.on('data', function (data) {
                body += data;
                if (body.length > 1e6) {
                    // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                    request.connection.destroy();
                }
            });
            request.on('end', function () {
                var POST = qs.parse(body);
                // use POST
                if (POST.passwd != '31452') {
                    filePath = './entrance.html';
                }
            });
        }
        else {
            filePath = './entrance.html';
        }
    }
    
    if (processtype == 'getdata') {
        require('./getdata.js').getdata(getcommand,response);
    }
    else if (processtype == 'file') {
        var extname = path.extname(filePath);
        var contentType = 'text/html';
        var ifbinary = false;
        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.gif':
                contentType = 'image/gif';
                ifbinary = true;
                break;
            case '.png':
                contentType = 'image/png';
                ifbinary = true;
                break;
            case '.jpg':
                contentType = 'image/jpeg';
                ifbinary = true;
                break;
        }
         
        path.exists(filePath, function(exists) {
         
            if (exists) {
                if (ifbinary) {
                    fs.stat(filePath, function(error, stat) {
                        var rs;
                        response.writeHead(200,{ 'Content-Type': contentType, 'Content-Length' : stat.size });
                        rs = fs.createReadStream(filePath);
                        util.pump(rs, response, function(err) {
                            if(err) {
                              throw err;
                            }
                        });
                    });
                }
                else {
                    fs.readFile(filePath, function(error, content) {
                        if (error) {
                            response.writeHead(500);
                            response.end();
                        }
                        else {
                            response.writeHead(200, { 'Content-Type': contentType });
                            response.end(content, 'utf-8');
                        }
                    });
                }
            }
            else {
                response.writeHead(404);
                response.end();
            }
        });
    }     
}).listen(8125);
 
console.log('Server running at http://127.0.0.1:8125/');