const port = process.env.PORT || 3000;
const corsMiddleware = require('restify-cors-middleware')
var restify = require('restify');
var jobsData = require('./job-search.json');

// CORS for Access-Control
const cors = corsMiddleware({
  preflightMaxAge: 5, 
  origins: ['*'], 
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry']
})

// Creating sever and setting the routes
var server = restify.createServer();
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.queryParser());
server.get('/', getIndex);
server.get('/api/jobs/list', getAllJobDetails);
server.get('/api/jobs/:id', getJobDetails);
server.get('/api/jobs/filter', getFilteredJobDetails);

// Server deploy message on home page
function getIndex(req, res, next) {
  res.send("Backend server is running successfully by Manogajapathi");
  next();
}

// Display list of job details
function getAllJobDetails(req, res, next) {
  res.send({"code":200,"data":jobsData});
  next();
}

// Display a particular job details using jobID
function getJobDetails(req, res, next) {
  let id = req.params.id;
  var selectedJob = jobsData.filter(function(i) {
    return i.jobID == id;
  }); 
  if(id < 1 || id > 25) {
    res.send({"code":200,"message":"no job matched"});
  }
  else
  res.send({"code":200,"data":selectedJob});
  next();
}

// Job filter with title
function getFilteredJobDetails(req, res, next) {
  var filter = req.query;
  var jobTitle = filter.title;
  var selectedJob = jobsData.filter(function(i) {
    return i.jobTitle == jobTitle;
  }); 
  if(selectedJob == "") {
    res.send({"code":200,"message":"no job title matched"});
  }
  else
    res.send({"code":200,"data":selectedJob});
  next();
}

// Starting the server on port 3000
server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});