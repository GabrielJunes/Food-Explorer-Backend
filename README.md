<h1 align="center" style="text-align: center;">
  <img alt="Logo Food Explorer" src="./src/assets/favicon.svg" style="vertical-align: middle; margin-right: 10px;">
  Food Explorer
</h1>


<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

<h2 id="project">📁 Projeto</h2>


O projeto Food Explorer consiste no desafio final do programa Explorer da Rocketseat. 
Neste projeto trabalhamos com todas as tecnologias que aprendemos ao longo do programa. Onde a proposta é desenvolver um cardápio digital para um restaurante fictício

O back-end do projeto, que lida com toda a regra de negócios da aplicação, armazenamento dos dados e etc.. está disponível neste repositório. Já o front-end, responsável pela interface do usuário, está disponível [aqui](https://github.com/GabrielJunes/Food-explorer-frontEnd).

<h2 id="technologies">💻 Tecnologias</h2>

Este projeto foi desenvolvido com as seguintes tecnologias:

Back-end:
- Bcrypt.js
- CORS
- Dotenv
- Express.js
- express-async-errors
- JSON Web Token
- Knex.js
- Node.js
- Multer
- PM2
- SQLite
- SQLite3

Front-end:
- Vite
- React
- Styled components
- react-router-dom
- CSS in js
- Swiper
- React Responsive
- Axios

<h2 id="usage">💡 Utilização</h2>

O back-end do projeto está hospedado no endereço https://foodexplorer-api-pkbv.onrender.com
A aplicação Food Explorer está disponível para uso [aqui](https://foodexplorer2525.netlify.app).

⚠️ **Importante**: Por estar hospedado em um serviço gratuito, o BackEnd "hiberna" após 15 minutos sem utilização.
Se você está tentando acessar o site e o BackEnd não responde, apenas aguarde, pois ele estará "inicializando" os serviços.
Esta etapa poderá demorar até 1 minuto, dependendo da carga nos servidores do Render.



Você também pode executá-lo em sua máquina localmente. Certifique-se de ter o ``Node.js`` e o ``npm`` instalados antes de prosseguir com as etapas abaixo:

1. Clone o projeto:

```
$ git clone https://github.com/GabrielJunes/Food-Explorer-Backend
```

2. Acesse a pasta do projeto:

```
$ cd food-explorer-backend
```

3. Instale as dependências:

```
$ npm install
```

4. Execute as migrações:

```
$ npm run migrate
```

5. Inicie o servidor:

```
$ npm start
```
<h2 id="users">👩🏾‍💻 Personas</h2>

O Food Explorer possui duas personas principais: o admin e o usuário. Você pode criar um novo usuário ou testar a aplicação usando as seguintes informações de login:

Admin:

- E-mail: admin@email.com
- Senha: 123456

O admin tem acesso privilegiado e pode gerenciar o cardápio, adicionando, editando e removendo pratos, além de executar outras tarefas administrativas.

Usuário:

- E-mail: client@email.com
- Senha: 123456

O usuário tem acesso restrito às funcionalidades da aplicação, podendo visualizar o cardápio, filtrar pratos, ver detalhes de pratos específicos, favoritar pratos e adicionar pratos ao carrinho.

⚠️ **Importante**: Crie um arquivo .env de acordo com o arquivo .env.example e preencha os campos AUTH_SECRET e PORT com suas respectivas informações.

- Para gerar o valor para o campo AUTH_SECRET, você pode utilizar o MD5 Hash Generator para gerar uma sequência de caracteres segura

- Preencha o campo PORT com o número da porta desejada para executar o servidor da aplicação