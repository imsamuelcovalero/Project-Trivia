export default async function getQuestions(token) {
  const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(endpoint);
  const responseBody = await response.json();
  return responseBody;
}
