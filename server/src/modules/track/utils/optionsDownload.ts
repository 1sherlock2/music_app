export default (url) => ({
  method: 'POST',
  headers: {
    accept: 'application/json, text/plain, */*',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'no-cache',
    'content-length': '53',
    'content-type': 'application/json',
    pragma: 'no-cache',
    origin: 'https://ssyoutube.com',
    referer: `https://ssyoutube.com/en120/`,
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin'
  },
  body: JSON.stringify({ url })
});
