const getRanking = require('./getRanking');

const saveRanking = (ranking) => {
  if (getRanking() === null) {
    localStorage.setItem('ranking', JSON.stringify([ranking]));
  } else {
    localStorage.setItem(
      'ranking',
      JSON.stringify([
        ...getRanking(),
        ranking,
      ]),
    );
  }
};
if (typeof module !== 'undefined') {
  module.exports = saveRanking;
}
