import EncryptedStorage from 'react-native-encrypted-storage';

const API_uri = 'https://238669cf456c0986.api-us.cometchat.io/v3/';
function CallApi(
  endpoint,
  method = 'GET',
  body = null,
  headers = {},
  token = null,
) {
  // console.log('call api for ', endpoint, method, body);

  // const toUrlEncoded = obj =>
  //   Object.keys(obj)
  //     .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]))
  //     .join('&');
  var qs = require('qs');
  const toUrlEncoded = obj => qs.stringify(obj);
  body = body ? toUrlEncoded(body) : null;

  console.log('body:', body);
  return new Promise(resolve => {
    let headres = {
      'Content-Type': 'application/x-www-form-urlencoded',
      apiKey: '9ccb4f4fc7152b0c0a0b07cedbba63236ae74a0c',
      ...headers,
      // 'Access-Control-Request-Headers': 'Authorization',
      // Authorization: 'Bearer ' + (token ? token : ''),
    };
    fetch(API_uri + endpoint, {
      method: method,
      headers: headres,
      body: body,
    })
      .then(r => r.json())
      .then(response => {
        // console.log('response:', response);
        resolve(response);
      })
      .catch(e => {
        // console.log(e);
        resolve({
          status: 500,
          message: e.message,
        });
      });
  });
}

async function setToken(token) {
  console.log('saving token :', token);
  return EncryptedStorage.setItem('token', token)
    .then(() => 'success')
    .catch(e => 'error');
}
async function getToken() {
  const token = await EncryptedStorage.getItem('token');
  console.log('retreiving token :', token);
  return token;
}
export default CallApi;
export {setToken, getToken};
