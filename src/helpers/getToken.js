export default async function getToken() {
  const requestApi = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(requestApi);
  const responseBody = await response.json();
  return responseBody;
}
