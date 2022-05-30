import { screen } from '@testing-library/react'
import React from 'react'
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux'
import App from '../App'
import userEvent from '@testing-library/user-event'
import saveRanking from '../helpers/saveRanking';

describe('testa o funcionamento da página "Ranking"', () => {
  test('testa se a pagina exibe todos os elementos', () => {
    const playerListObject = [{
      playerName: 'rona',
      playerScore: 50,
      playerImage: 'https://www.gravatar.com/avatar/4675ee57486c6ab9507d64d763ffd4f3',

    },
    {
      name: 'blu',
      score: 50,
      picture: 'https://www.gravatar.com/avatar/222222',
    }
    ];
    saveRanking(playerListObject);
    
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/Feedback')

    const buttonRanking = screen.getByTestId('btn-ranking')
    expect(buttonRanking).toBeInTheDocument();

    userEvent.click(buttonRanking)

    const titleRanking = screen.getByRole('heading', {name: 'Ranking', level: 1});
    expect(titleRanking).toBeInTheDocument();

    const imgPlayer = screen.getAllByRole('img', {name: 'player'});
    expect(imgPlayer[0]).toBeInTheDocument();
    expect(imgPlayer[1]).toBeInTheDocument();

    const playerName = screen.getByTestId('player-name-0');
    expect(playerName).toBeInTheDocument();

    const playerScore = screen.getByTestId('player-score-0');
    expect(playerScore).toBeInTheDocument();

    const playerName2 = screen.getByTestId('player-name-1');
    expect(playerName).toBeInTheDocument();

    const playerScore2 = screen.getByTestId('player-score-1');
    expect(playerScore).toBeInTheDocument();

    const btnHome = screen.getByRole('button', {name: 'Home'});
    expect(btnHome).toBeInTheDocument();

    userEvent.click(btnHome);

    const titleLogin = screen.getByRole('heading', {name: 'Login', level: 1});
    expect(titleLogin).toBeInTheDocument();
  });
});
