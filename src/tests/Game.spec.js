import { findByRole, fireEvent, getByText, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux'
import App from '../App'
import userEvent from '@testing-library/user-event'
import { questionsResponse, invalidTokenQuestionsResponse } from './mocks/questions';

describe('Testa se a página de Game tem os elemento e comportamento esperados', () => {
    it('Testa se a página possui uma imagem de Gravatar, o nome do player, '
      + 'um contador e um score zerado', async () => {
      renderWithRouterAndRedux(<App />)
      const userName = 'pedro'
      const userEmail = 'pedro@gmail.com'
      const buttonPlayEl = screen.getByRole('button', { name: 'Play' });
      expect(buttonPlayEl).toBeInTheDocument();
      const input = screen.getAllByRole('textbox');
  
      userEvent.type(input[0], userName);
      userEvent.type(input[1], userEmail);
      fireEvent.click(buttonPlayEl);

      await screen.findByText('Game');
      await screen.findByTestId('header-profile-picture');
      const nameEl = screen.getByTestId('header-player-name');
      expect(nameEl).toBeInTheDocument();
      const timerEl = screen.getByTestId('timer');
      expect(timerEl).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /0/i,
      level: 3 })).toBeInTheDocument();
    })

    it('Testa se ao receber um token expirado retorna a tela de Login', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(invalidTokenQuestionsResponse),
      });

      const {history, debug} = renderWithRouterAndRedux(<App />, {}, '/Game');

      debug()

      await waitForElementToBeRemoved( () => screen.getByText('Game'));
      expect(history.location.pathname).toBe('/');

      jest.restoreAllMocks();
  })

    it('Testa se ao jogar 5 vezes o comportamento ocorre como esperado', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
          json: jest.fn().mockResolvedValue(questionsResponse),
        });

        jest.useFakeTimers();

        const {history} = renderWithRouterAndRedux(<App />);
        const userName = 'pedro'
        const userEmail = 'pedro@gmail.com'
        const buttonEl = screen.getByRole('button', { name: 'Play' });
        const input = screen.getAllByRole('textbox');
    
        userEvent.type(input[0], userName);
        userEvent.type(input[1], userEmail);
        fireEvent.click(buttonEl)
        await screen.findByText('Game');

        await waitFor(() => {
          jest.advanceTimersByTime(5000);
          const categoryEl = screen.getByTestId('question-category');
          expect(categoryEl).toBeInTheDocument();
          expect(categoryEl).toHaveTextContent('Geography');
          const questionEl = screen.getByTestId('question-text');
          expect(questionEl).toBeInTheDocument();
          const answerEl = screen.getByTestId('answer-options');
          expect(answerEl).toBeInTheDocument();

          const correctAnswerEl = screen.getByTestId('correct-answer');

          userEvent.click(correctAnswerEl);
          const nextButtonEl = screen.getByTestId('btn-next');
          expect(nextButtonEl).toBeInTheDocument();
          userEvent.click(nextButtonEl);
        });

        await waitFor(() => {
          jest.advanceTimersByTime(5000);
          const categoryEl = screen.getByTestId('question-category');
          expect(categoryEl).toBeInTheDocument();
          expect(categoryEl).toHaveTextContent('Science & Nature');
          const questionEl = screen.getByTestId('question-text');
          expect(questionEl).toBeInTheDocument();
          const answerEl = screen.getByTestId('answer-options');
          expect(answerEl).toBeInTheDocument();

          const wrongAnswerEl = screen.getByTestId('wrong-answer-0');

          userEvent.click(wrongAnswerEl);
          const nextButtonEl = screen.getByTestId('btn-next');
          expect(nextButtonEl).toBeInTheDocument();
          userEvent.click(nextButtonEl);
        });

        await waitFor(() => {
          jest.advanceTimersByTime(5000);
          const categoryEl = screen.getByTestId('question-category');
          expect(categoryEl).toHaveTextContent('Science: Computers');

          const wrongAnswerEl = screen.getByTestId('wrong-answer-0');

          userEvent.click(wrongAnswerEl);
          const nextButtonEl = screen.getByTestId('btn-next');
          expect(nextButtonEl).toBeInTheDocument();
          userEvent.click(nextButtonEl);
        });

        await waitFor(() => {
          jest.advanceTimersByTime(5000);
          const categoryEl = screen.getByTestId('question-category');
          expect(categoryEl).toHaveTextContent('Entertainment: Video Games');

          const wrongAnswerEl = screen.getByTestId('wrong-answer-0');

          userEvent.click(wrongAnswerEl);
          const nextButtonEl = screen.getByTestId('btn-next');
          expect(nextButtonEl).toBeInTheDocument();
          userEvent.click(nextButtonEl);
        });

        await waitFor(() => {
          jest.advanceTimersByTime(5000);
          const categoryEl = screen.getByTestId('question-category');
          expect(categoryEl).toHaveTextContent('Entertainment: Japanese Anime & Manga');

          const wrongAnswerEl = screen.getByTestId('wrong-answer-0');

          userEvent.click(wrongAnswerEl);
          const nextButtonEl = screen.getByTestId('btn-next');
          expect(nextButtonEl).toBeInTheDocument();
          userEvent.click(nextButtonEl);

          expect(history.location.pathname).toBe('/Feedback');
        });

        jest.restoreAllMocks();
    })
})