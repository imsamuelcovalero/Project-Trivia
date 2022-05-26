const getRanking = () => JSON.parse(localStorage.getItem('ranking'));

if (typeof module !== 'undefined') {
  module.exports = getRanking;
}
