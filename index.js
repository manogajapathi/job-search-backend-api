const port = process.env.PORT || 3000;
var restify = require('restify');
var jobsData = require('./job-search.json');

function getIndex(req, res, next) {
  res.send("Backend server is running successfully by Manogajapathi");
  next();
}

function getJobDetails(req, res, next) {
  res.json(jobsData);
  next();
}

var server = restify.createServer();
server.get('/', getIndex);
server.get('/api/jobs', getJobDetails);

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});