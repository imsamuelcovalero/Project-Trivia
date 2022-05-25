const userToken = (token) => {
  localStorage.setItem('token', token);
};

if (typeof module !== 'undefined') {
  module.exports = userToken;
}
