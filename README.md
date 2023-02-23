# Bem-vindo ao projeto Trivia

Trivia é uma aplicação em React.js produzida em grupo, que desafia os usuários a responder a uma sequência de perguntas de múltipla escolha sobre diversos temas em um tempo limitado de 30 segundos por questão. A aplicação registra a escolha correta das respostas e o tempo de resposta, culminando em um score total exibido ao final das 5 perguntas. Além disso, os usuários podem consultar o ranking com outros scores armazenados no Local Storage.

## Sumário
- [Bem-vindo ao projeto Trivia](#bem-vindo-ao-projeto-trivia)
- [Preview](#preview)
- [Contexto](#contexto)
- [Tecnologias e Ferramentas Utilizadas](#tecnologias-e-ferramentas-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
- [Notas](#notas)
 - [Git, GitHub e Histórico de Commits](#git-github-e-histórico-de-commits)
 - [Lint](#lint)
 
## Preview

https://user-images.githubusercontent.com/98184355/220802705-04932fa9-bb03-4e38-b47a-72fc9aed3c8a.mp4

## Contexto
A aplicação Trivia é uma implementação do famoso jogo de perguntas e respostas, em que o usuário pode:
- Fazer login;
- Responder a uma sequência de 5 perguntas;
- Ter o tempo de resposta contabilizado, visto que um cronômetro de 30 segundos é iniciado em cada nova pergunta;
- Verificar o score total referente à sequência respondida;
- Consultar o ranking com os demais scores, que fica armazenado no Local Storage.

## Tecnologias e Ferramentas Utilizadas

Este projeto utiliza as seguintes tecnologias e ferramentas:

- [React.js com classes](https://reactjs.org/docs/getting-started.html) | Biblioteca para criar interfaces de usuário.
- [Tailwind CSS](https://tailwindcss.com/) | Biblioteca para estilização do CSS.
- [API de Trivia](https://economia.awesomeapi.com.br/json/all) | API utilizada para obter perguntas e respostas atualizadas para o jogo..
- [Redux](https://redux.js.org/) | Biblioteca de gerenciamento de estado.
- [Trello](https://trello.com/) | Ferramenta de gerenciamento de tarefas.

O React.js foi escolhido por ser uma das bibliotecas mais populares e amplamente utilizadas para criar interfaces de usuário. Além disso, ele oferece suporte a programação orientada a objetos, o que é importante para o desenvolvimento de projetos maiores. O Tailwind CSS foi escolhido por ser uma biblioteca que permite estilização mais fácil e rápida dos componentes, facilitando o processo de desenvolvimento. A API do Trivia foi utilizada para obter perguntas e respostas atualizadas para o jogo, fornecendo informações precisas e detalhadas. O Redux foi utilizado para gerenciar o estado global da aplicação, tornando mais fácil a comunicação entre diferentes componentes e permitindo uma melhor organização do código. O Trello foi utilizado para gerenciamento de tarefas, seguindo metodologias ágeis durante o desenvolvimento.

## Instalação e Execução
### Download do projeto
```
git clone git@github.com:imsamuelcovalero/Project-Trivia.git
```
### Install dependencies
```
cd Project-Trivia
npm install
```
### Run the application
```
cd Project-Trivia
npm start
```

## Notas
### Git, GitHub e Histórico de Commits
Este projeto utilizou a [Especificação de Commits Convencionais](https://www.conventionalcommits.org/en/v1.0.0/), com alguns tipos da [convenção Angular](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines). Além disso, foi utilizado o pacote [conventional-commit-cli](https://www.npmjs.com/package/conventional-commit-cli) para ajudar a seguir a convenção de commits. É importante utilizar a convenção de commits em projetos para manter o histórico de commits organizado e facilitar a leitura e o entendimento do que foi desenvolvido.

### Metodologias Ágeis
Durante o desenvolvimento deste projeto, foram utilizadas metodologias ágeis, que são práticas que valorizam a interação e colaboração entre os membros de uma equipe de desenvolvimento, visando uma entrega mais rápida e eficiente do projeto. A utilização dessas práticas é especialmente importante em projetos em grupo, pois ajuda a manter a equipe alinhada e a evitar atrasos e retrabalhos desnecessários. Para saber mais sobre as metodologias ágeis, confira o [Manifesto Ágil](https://agilemanifesto.org/).

### Lint
- O projeto foi desenvolvido seguindo os padrões de Clean Code especificados pelo [Lint da Trybe](https://github.com/betrybe/eslint-config-trybe).
