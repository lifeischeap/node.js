var MailChimpAPI = require('mailchimp').MailChimpAPI; 

var apiKey = '8a92fd84536c51cc3dab62fe67cb2c4b-us6';   

var fs = require('fs'); 

var moment = require('moment');

var oneweekagodate = moment().subtract('days',7).format("YYYY-MM-DD HH:mm:ss");

console.log(oneweekagodate);

try { 
    var api = new MailChimpAPI(apiKey, { version : '2.0' });
} catch (error) {
    console.log(error.message);
}


api.call('campaigns', 'list', 
{
status: 'sent',
sendtime_start: oneweekagodate
}
, function (error, data) {
    if (error)
        console.log(error.message);
    else
      fs.writeFile("./campaignslist.txt", JSON.stringify(data), function(err) {
          if(err) {
             console.log(err);
          } else {
             console.log("The file was saved!");
          }
});


//api.call('reports', 'opened', { cid: '6d90094319' }, function (error, data) {
//    if (error)
//        console.log(error.message);
//    else
//       //console.log(JSON.stringify(data)); // Do something with your data!
//       fs.writeFile("./campaignclicks.txt", JSON.stringify(data), function(err) {
//          if(err) {
//             console.log(err);
//          } else {
//             console.log("The file was saved!");
//          }
//});


});
