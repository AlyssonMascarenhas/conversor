# Conversor de Moedas

<p align="center">
<a href="https://codeclimate.com/github/AlyssonMascarenhas/conversor/maintainability"><img src="https://api.codeclimate.com/v1/badges/8a3f60f121cc3aad9850/maintainability" /></a>
</p>

Está é uma aplicação Angular criada com [Nx](https://nx.dev/nx-api/angular), e foi desenvolvida para mostrar a conversão de três moedas em Real Brasileiro(BRL)

## Visualização WEB

![image](https://github.com/AlyssonMascarenhas/conversor/assets/54484070/414bb71e-9cea-4d46-946a-4ae97b80a935)

## Visualização Mobile

![gif](https://github.com/AlyssonMascarenhas/conversor/assets/54484070/6679927d-e74b-4ede-8b12-3c194a8a0805)

## Tecnologias utilizadas

- Nx
- Angular v16.2.0
- Node.js v18.10.0
- TypeScript
- HTML
- SCSS

## Instruções para executar o projeto

Certifique-se de ter o Node.js na versão 18.10.0 instalado em sua máquina, caso não tenha sugiro que veja esse [link](https://www.treinaweb.com.br/blog/instalando-e-gerenciando-varias-versoes-do-node-js-com-nvm)

1. Clone o repositório: <br/>

```
  git clone https://github.com/AlyssonMascarenhas/conversor/
```

2. Acesse a pasta do projeto: <br/>

```
  cd conversor
```

3. Verifique see tem o Node.js e se o mesmo está na versão correta:

```
  node --version
```

4. Instale as dependências do projeto

```
  npm install
```

5. Execute o projeto

```
  npm start
```

## Testes JEST

Caso já tenha feito o clone e instalação de depêndencias do projeto, você pode rodar os testes JESTs com os seguintes comandos:

- Testes

```
  yarn test
```

- Testes + Coverage(Será criada uma pasta na raiz do projeto /coverage, e para visualizar o coverage basta abrir o arquivo `index.html` no navegador)

```
  yarn test:coverage
```

### Cobertura atual

![image](https://github.com/AlyssonMascarenhas/conversor/assets/54484070/5ee9a378-e953-479c-9ecf-899e13396115)

