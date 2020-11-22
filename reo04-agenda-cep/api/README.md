# API da agenda de contatos

Essa é a pasta destinada a API da agenda de contatos.

O desenvolvimento conta com as seguintes ferramentas:

1. NodeJS
2. Knex
3. Typescript
4. PostgreSQL
5. Express
6. Celebrate

## Como executar

Para começar é necessário que tenha um banco suportado pelo Knex (pode ver mais [aqui](http://knexjs.org/)) e um schema disponível para uso.

As configurações de usuário, senha, database e cliente (MySQL, PostgreSQL, etc) estão presentes no arquivo `knexfile.example.js`. Ele contém o mínimo necessário para a aplicação conseguir persistir os dados.

Crie um arquivo `knexfile.js` baseado nas configurações presentes no `knexfile.example.js`. Para saber mais sobre as configurações visite a [documentação](http://knexjs.org/).

- Instale as dependências do projeto com `npm install` (ou caso esteja utilizando o Yarn, execute: `yarn`) na raíz da pasta;
- Execute a migration destinada a criação da tabela no banco de dados com o comando `npm run db.update` (ou caso esteja utilizando o Yarn, execute: `yarn db.update`);
- Inicie a aplicação com o comando `npm run dev` (ou caso esteja utilizando o Yarn, execute: `yarn dev`)

# Autor

| [<img src="https://avatars0.githubusercontent.com/u/11544276?v=4&s=450" width=115><br><sub>@lhleonardo</sub>](https://github.com/lhleonardo) <br><sub>Leonardo Braz</sub> |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------: |

