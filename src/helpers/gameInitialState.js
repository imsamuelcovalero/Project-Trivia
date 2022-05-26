const gameInitialState = {
  question: [],
  category: '',
  answers: [],
  buttonDisable: false,
  loading: false,
  score: 0,
  assertions: 0,
  timer: 30,
  interval: null,
  btnNext: false,
  correctButtonsColor: '',
  incorrectButtonsColor: '',
  counterQuestion: 0,
  apiQuestions: [],
};

export default gameInitialState;
