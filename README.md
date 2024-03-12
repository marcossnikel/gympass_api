# API Gympass based

- Geolocalização
- Só pode entrar até x minutos após feito check in

# RFs (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-in;
- [x] Deve ser possível o usuário buscar academias próximas (ate 10 km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

# RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-maikw duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validade por administradores;
- [ ] A academia só pode ser cadastradas por administradores;

# RNFs (Requisitos não funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um bando PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 items por página;
- [ ] O usuário deve ser identifícavel por um JWT (JSON Web Token)
