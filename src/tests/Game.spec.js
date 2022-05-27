import { findByRole, fireEvent, getByText, screen } from '@testing-library/react'
import React from 'react'
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux'
import App from '../App'
import userEvent from '@testing-library/user-event'

describe('Testa se a página de Game tem os elemento e comportamento esperados', () => {
    test('Testa se a página possui um contador, um tema de pergunta, uma pergunta e os botões de resposta', async () => {
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
    //   expect(gameText).toBeInTheDocument();
      await expect(screen.getByText('Game')).toBeInTheDocument();
      const timerEl = screen.getByTestId('timer');
      expect(timerEl).toBeInTheDocument();
    })

    // test('testa se ao clicar no botão, ele redireciona para outra página', async () => {
    //     renderWithRouterAndRedux(<App />);
    //     const userName = 'pedro'
    //     const userEmail = 'pedro@gmail.com'
    //     const buttonEl = screen.getByRole('button', { name: 'Play' });
    //     const input = screen.getAllByRole('textbox');
    
    //     userEvent.type(input[0], userName);
    //     userEvent.type(input[1], userEmail);
    //     fireEvent.click(buttonEl)
    //     await screen.findByText('Game');
    // })
})