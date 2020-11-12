# Agenda de Contatos

Repositório para manter agenda de contatos

Aplicação desenvolvida como 3º REO de Programação WEB.

# Executando

Para a aplicação ser executada é necessário executar primeiramente a API e depois executar a aplicação Web, de acordo com os passos abaixo:

## API

1. Entrar na pasta `api`;
2. Criar o arquivo `knexfile.js` de acordo com as variáveis definidas no arquivo `knexfile.example.js` para conexão com o banco de dados;
3. Executar as migrations para criar a tabela no banco de dados com o comando `npm run migration` (PS: deve ser criado um banco de dados anteriormente);
4. Rodar a api com o comando `npm start`.

## WEB

1. Entrar na pasta `web`;
2. Executar o comando `npm start`.
