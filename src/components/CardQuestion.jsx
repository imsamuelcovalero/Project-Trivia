import React from 'react';
import PropTypes from 'prop-types';
import { decode } from 'he';

function CardQuestion(props) {
  const { question, category, answerButtonSetup } = props;
  return (
    <div className=" min-h-40 shadow-xl rounded border-black border-2 bg-purple-400 p-4 gap-4 lg:text-lg text-center text-amber-300 font-bold">
      <span className="text-xl font-bold text-black mt-10" data-testid="question-category">
        { category }
      </span>
      <div
        data-testid="question-text"
        className="my-4 mx-2"
      >
        { decode(question) }
      </div>
      <div
        className="flex flex-col gap-2 my-10"
        data-testid="answer-options"
      >
        {answerButtonSetup()}
      </div>
    </div>
  );
}
CardQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  answerButtonSetup: PropTypes.func.isRequired,
};
export default CardQuestion;
