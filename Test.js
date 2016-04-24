import request from 'request';

request({
  url: 'https://api.idxbroker.com/clients/featured',
  headers: {
    'Content-Type':'application/x-www-form-urlencoded',
    'accesskey':'of93tXokNuewFBTkZVVJqg'
  }
}, (err, result)=>{
  // console.log(err);
  console.log(result);
});
