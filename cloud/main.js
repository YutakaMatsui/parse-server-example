
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("helloAgain", function(request, response) {
  response.success("Hello world!(again)");
});

Parse.Cloud.define("sendPushApplauseSoundToDeviceToken", function(request, response) {
  var recipientUserId = request.params.recipientId;
  var message = request.params.message;
                    
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo("deviceToken", recipientUserId);
   
  // Send the push notification to results of the query
  Parse.Push.send({
    where: pushQuery,
    data: {
      alert: message,
      sound:"applause.mp3",
      badge:"Increment"
    }
  }, {useMasterKey: true}).then(function() {
      response.success("Push was sent successfully.")
  }, function(error) {
      response.error("Push failed to send with error: " + error.message);
  });
});

Parse.Cloud.define("sendPushRessetSoundToDeviceToken", function(request, response) {
  var recipientUserId = request.params.recipientId;
  var message = request.params.message;
                    
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo("deviceToken", recipientUserId);
   
  // Send the push notification to results of the query
  Parse.Push.send({
    where: pushQuery,
    data: {
      alert: message,
      sound:"reset.mp3",
      badge:"Increment"
    }
  }, {useMasterKey: true}).then(function() {
      response.success("Push was sent successfully.")
  }, function(error) {
      response.error("Push failed to send with error: " + error.message);
  });
});

Parse.Cloud.define("sendPushChan2SoundToDeviceToken", function(request, response) {
  var recipientUserId = request.params.recipientId;
  var message = request.params.message;
                    
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo("deviceToken", recipientUserId);
   
  // Send the push notification to results of the query
  Parse.Push.send({
    where: pushQuery,
    data: {
      alert: message,
      sound:"chan2.mp3",
      badge:"Increment"
    }
  }, {useMasterKey: true}).then(function() {
      response.success("Push was sent successfully.")
  }, function(error) {
      response.error("Push failed to send with error: " + error.message);
  });
});

Parse.Cloud.define("sendPushChimeSoundToDeviceToken", function(request, response) {
  var recipientUserId = request.params.recipientId;
  var message = request.params.message;
                    
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo("deviceToken", recipientUserId);
   
  // Send the push notification to results of the query
  Parse.Push.send({
    where: pushQuery,
    data: {
      alert: message,
      sound:"chime.mp3",
      badge:"Increment"
    }
  }, {useMasterKey: true}).then(function() {
      response.success("Push was sent successfully.")
  }, function(error) {
      response.error("Push failed to send with error: " + error.message);
  });
});
