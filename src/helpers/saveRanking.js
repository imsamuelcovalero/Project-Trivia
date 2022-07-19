const getRanking = require('./getRanking');

export const saveRanking = (ranking) => {
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
