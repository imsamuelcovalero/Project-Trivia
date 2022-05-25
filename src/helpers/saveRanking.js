const saveRanking = (ranking) => {
  console.log('Entrou em saveRanking');
  localStorage.setItem('ranking', JSON.stringify([ranking]));
};

if (typeof module !== 'undefined') {
  module.exports = saveRanking;
}
