import { screen } from '@testing-library/react'
import React from 'react'
import { renderWithRouterAndRedux } from '../helpers/renderWithRouterAndRedux'
import App from '../App'
import userEvent from '@testing-library/user-event'

describe('testa se a página de login contém os campos necessários', () => {
  test('testa se a página possui dois inputs para o usuário', () => {
    renderWithRouterAndRedux(<App />)
    const InputEl = screen.getAllByRole('textbox');

    expect(InputEl.length).toEqual(2);
    InputEl.map((input) => expect(input).toBeInTheDocument());
  })

  test('testa se a página possui um botão', () => {
    renderWithRouterAndRedux(<App />);

    const buttonEl = screen.getByRole('button', { name: 'Play' });

    expect(buttonEl).toBeInTheDocument();
  })

  test('testa se ao digitar um usuário inválido, o botão está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const userName = 'pedro'
    const userEmail = 'pedro.com'
    const buttonEl = screen.getByRole('button', { name: 'Play' });

    const input = screen.getAllByRole('textbox');
    userEvent.type(input[0], userName);
    userEvent.type(input[1], userEmail);
    expect(buttonEl).toHaveAttribute('disabled');
  })

  test('testa se ao digitar um usuário válido, o botão está Habilitado', () => {
    renderWithRouterAndRedux(<App />);
    const userName = 'pedro'
    const userEmail = 'pedro@gmail.com'
    const buttonEl = screen.getByRole('button', { name: 'Play' });

    const input = screen.getAllByRole('textbox');
    userEvent.type(input[0], userName);
    userEvent.type(input[1], userEmail);
    expect(buttonEl).not.toHaveAttribute('disabled');
  })

  test('testa se ao clicar no botão, ele redireciona para outra página', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const userName = 'pedro'
    const userEmail = 'pedro@gmail.com'
    const buttonEl = screen.getByRole('button', { name: 'Play' });
    const input = screen.getAllByRole('textbox');

    userEvent.type(input[0], userName);
    userEvent.type(input[1], userEmail);

    userEvent.click(buttonEl);
    expect(history.location.pathname).toEqual('/Game');
  })
})