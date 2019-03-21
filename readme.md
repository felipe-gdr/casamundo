# Casamundo

## Executando

### Crie a imagem do aplicativo Web

Execute `mvn install dockerfile:build ` na raiz do módulo web

### Inicie os containeres

Execute `docker-compose up` na raiz do módulo web. Isso irá iniciar um container rodando o MongoDB na porta 27017 e outro rodando o aplicativo web na porta 8080.


