import { screen } from '@testing-library/react'
import React from 'react'
import { renderWithRouterAndRedux } from '../helpers/renderWithRouterAndRedux'
import App from '../App'
import logo from '../trivia.png';
import userEvent from '@testing-library/user-event'

describe('testa se a página de login contém os campos necessários', () => {
  test('testa se existe uma imagem na página', () => {
    renderWithRouterAndRedux(<App />)
    const imgEl = screen.getByRole('img', {name: 'logo'});

    expect(imgEl).toBeInTheDocument()
    expect(imgEl).toHaveAttribute('src', logo);
  })
  test('testa se a página possui dois inputs para o usuário', () => {
    renderWithRouterAndRedux(<App />)
    const InputEl = screen.getAllByRole('textbox');

    expect(InputEl.length).toEqual(2);
    InputEl.map((input) => expect(input).toBeInTheDocument());
  })

  test('verifica se os inputs possuem os data-testid correspondentes', () => {
    renderWithRouterAndRedux(<App />)
    const InputEl = screen.getAllByRole('textbox');
    const dataTestIdName = "input-player-name";
    const dataTestIdEmail = "input-gravatar-email"

    expect(InputEl[0]).toHaveAttribute('data-testid', dataTestIdName)
    expect(InputEl[1]).toHaveAttribute('data-testid', dataTestIdEmail)
  })

  test('testa se a página possui um botão com um data-testid', () => {
    renderWithRouterAndRedux(<App />);
    const dataTestIdButton = "btn-play"
    const buttonEl = screen.getByRole('button', { name: 'Play' });

    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toHaveAttribute('data-testid', dataTestIdButton)
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

    setInterval(() => {
      expect(history.location.pathname).toEqual('/Game');
    }, 2000);

  })

  test('testa se possui um botão com o texto Settings', () => {
    renderWithRouterAndRedux(<App />);
    const buttonEl = screen.getByRole('button', { name: 'Settings' });

    expect(buttonEl).toBeInTheDocument();
  })
  test('testa se ao clicar no botão, ele redireciona para página Settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const userName = 'pedro'
    const userEmail = 'pedro@gmail.com'
    const buttonEl = screen.getByRole('button', { name: 'Settings' });
    const input = screen.getAllByRole('textbox');

    userEvent.type(input[0], userName);
    userEvent.type(input[1], userEmail);
    userEvent.click(buttonEl);

    expect(history.location.pathname).toEqual('/Settings')
  })
})