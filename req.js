var request = require('request');
var url = `http://search.kuwo.cn/r.s?all=周杰伦&ft=music&%20itemset=web_2013&client=kt&pn=0&rn=5&rformat=json&encoding=utf8`;

var strurl = encodeURI(url);
request(strurl, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
});
