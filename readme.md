# Casamundo

## Executando

### Crie a imagem do aplicativo Web

Execute `mvn install dockerfile:build ` na raiz do módulo web

### Prepare restore do banco de dados
Descompacte um backup do MongoDB dentro do diretório `dev/db/dump`.


### Inicie os containeres

Execute `docker-compose up` na raiz do projeto. Isso irá iniciar um container rodando o MongoDB na porta 27017 com os dados restaurados e outro rodando o aplicativo web na porta 8080.
*Atenção*: os dados serão restaurados cada vez que o container do MongoDB é reiniciado. 


