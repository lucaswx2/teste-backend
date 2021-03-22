# Teste Backend

## Passos para rodar esse projeto:

1. Configure as váriaveis de ambiente no arquivo `.env` o código contido no arquivo `.env.example` deve ser usado como base
2. Execute o comando docker-compose up -d para executar o docker compose
3. Acesse a aplicação através da porta `5000`
4. Veja a documentação [Aqui]([https://link](https://documenter.getpostman.com/view/4002082/Tz5wXak2#intro))


## Sobre a arquitetura

Tentei aplicar os principios do SOLID e DDD, a aplicação é separada em 3 grandes camadas que são `@config` , `@shared` e `@domains`

- Na camada `@config` ficam arquivos necessários para a configuração de bibliotecas e features do projeto, neste projeto usei para colocar as configurações do ACL e do JWT
- Na camada `@shared` ficam os arquivos que serão compartilhados por todos os dominios da aplicação, como os ErrorsHandlers, o Express, e o TypeORM
- Na camada `@domains` ficam os dominios da aplicação, no caso desse projeto temos apenas o domínio `users`
- Dentro de cada domínio temos as services, os repositórios fakes para os testes unitários e a pasta infra que contém os controllers, as rotas, as Models do TypeORM e os repositórios do typeorm



### Disclaimer

Existem algumas coisas que eu ainda melhoraria nesse projeto:

1. Faria testes de integração para testar os controllers e rotas
2. Configuraria o Dockerfile e o docker-compose de forma diferente para um ambiente de produção
3. Colocaria uma nova camada entre a rota e o controller para fazer validações de acesso mais específicas
4. Configuraria melhor a injeção de dependências
5. Centralizaria a criação do hash da senha em um ponto único de acesso
6. Documentaria melhor utilizando o swagger

Como acredito que esteja bom o suficiente e o tempo está curto, preferi não executar os passos acima