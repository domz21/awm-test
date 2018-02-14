const API = 'http://192.168.43.11:3000';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
};

const get = async(uri) => await fetch(`${API}/${uri}`, {
  method: 'GET',
  headers,
});

const put = async(uri, body) => await fetch(`${API}/${uri}`, {
  method: 'PUT',
  body: JSON.stringify(body),
  headers,
});

module.exports = { get, put };
