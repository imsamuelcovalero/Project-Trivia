const saveRanking = (profilePicture) => {
  console.log('Entrou em saveRanking');
  localStorage.setItem('ranking', JSON.stringify([{ picture: profilePicture }]));
};

if (typeof module !== 'undefined') {
  module.exports = saveRanking;
}
