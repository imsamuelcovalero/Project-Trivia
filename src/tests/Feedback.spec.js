import React from 'react'
import { screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux'
import App from '../App';
import Feedback from '../pages/Feedback';
import userEvent from '@testing-library/user-event';

describe('testa se a página de feedback possui os elementos corretos', () => {
  test('verifica se a página possui o nome e o score do usuário', () => {
    renderWithRouterAndRedux(<Feedback />);
    const nameUser = screen.getByTestId('header-player-name')
    const scoreUser = screen.getByTestId('header-score')

    expect(nameUser).toBeInTheDocument();
    expect(scoreUser).toBeInTheDocument();
  })
  test('verifica se a página possui o score total', () => {
    renderWithRouterAndRedux(<Feedback />);

    const totalScore = screen.getByTestId('feedback-total-score')
    expect(totalScore).toBeInTheDocument();
  })
  test('verifica se a página possui o total de perguntas corretas', () => {
    renderWithRouterAndRedux(<Feedback />);

    const totalquestion = screen.getByTestId('feedback-total-question')
    expect(totalquestion).toBeInTheDocument();
  })
  test('verifica se a página possui um botão que redireciona para tela de login', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    history.push('/Feedback')
    const getButton = screen.getByTestId('btn-play-again')
    userEvent.click(getButton)
    expect(history.location.pathname).toBe('/');
    
  })
  test('verifica se a página possui um botão que redireciona para tela de Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/Feedback')
    const buttonRanking = screen.getByTestId('btn-ranking')
    expect(buttonRanking).toBeInTheDocument();
    userEvent.click(buttonRanking)
    expect(history.location.pathname).toEqual('/Ranking')
    
  })
})