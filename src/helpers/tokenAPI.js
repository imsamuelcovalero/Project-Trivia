export default async function getToken() {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(endpoint);
  const responseBody = await response.json();
  return responseBody;
}
