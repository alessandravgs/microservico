# Microserviços Projeto

Este repositório contém vários microserviços que compõem o projeto. A estrutura do repositório é a seguinte:

workspace
├── auth-ms
├── api-gateway
├── service-registry
├── post-ms
└── user-ms


## Microserviços

### auth-ms

Este microserviço é responsável pela autenticação de usuários.

#### Requests

- **POST /auth/login**: Responsável por autenticar o usuário e gerar um token.

### api-gateway

Este microserviço atua como um gateway de API, roteando as solicitações para os microserviços apropriados.

### service-registry

Este microserviço registra e fornece informações sobre outros microserviços.

#### Requests

- **GET /**: Retorna todos os serviços registrados.
- **GET /services/:name_service**: Retorna URLs de um serviço específico.
- **POST /register**: Registra um novo serviço.

### post-ms

Este microserviço gerencia posts de usuários.

#### Requests

- **GET /posts**: Retorna todos os posts.
- **GET /posts/user/:user_id**: Retorna posts por ID de usuário.
- **POST /posts**: Salva um novo post.

### user-ms

Este microserviço gerencia usuários.

#### Requests

- **GET /users**: Retorna todos os usuários.
- **GET /users/posts**: Retorna todos os usuários e seus posts.
- **GET /users/:user_id**: Retorna um usuário pelo ID.
- **GET /ping**: Verifica a conectividade.
- **POST /users**: Salva um novo usuário.

## Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/alessandravgs/microservico.git
   ```

2. Instale as dependências de cada microserviço:
   ```bash
    cd workspace/auth-ms
    npm install
    
    cd ../gateway
    npm install
    
    cd ../service-registry
    npm install
    
    cd ../post-ms
    npm install
    
    cd ../user-ms
    npm install
   ```

3. Execute cada microserviço:

- service-registry
   ```bash
    cd ../service-registry
    npm start
   ```

- api-gateway
   ```bash
   cd ../gateway
   npm start
   ```

- auth-ms
   ```bash
    cd workspace/auth-ms
    npm start
   ```

- post-ms
   ```bash
    cd ../post-ms
    npm start
   ```

- user-ms
   ```bash
    cd ../user-ms
    npm start
   ```
