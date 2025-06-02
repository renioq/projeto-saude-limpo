# 🏥 Projeto Saúde - Sistema de Apoio à Saúde Pública de Fortaleza

Sistema web desenvolvido com foco em acessibilidade à informação e gestão pessoal de saúde. A aplicação está organizada com **arquitetura de microserviços**, incluindo funcionalidades como:

- Consulta de unidades de saúde por bairro
- Acesso a notícias de saúde (acesso sem necessitar de realizar login)
- Gestão de vacinas pessoais
- Cadastro e login de usuários com autenticação JWT (JSON Web Token)

🔗 Acesse o sistema online (em produção):  
👉 [https://projeto-saude-vfinal-y3kx.vercel.app/](https://projeto-saude-vfinal-y3kx.vercel.app/)

---

## 📦 Tecnologias Utilizadas

| Camada         | Tecnologia                          |
|----------------|-------------------------------------|
| Frontend       | React + Vite                        |
| Backend        | Node.js + Express                   |
| Banco de dados | Back4App (Parse Server)             |
| APIs Externas  | Google Places API, NewsAPI          |
| Autenticação   | JWT (JSON Web Token)                |
| Hospedagem     | Vercel (frontend), Render (backend) |

---

## 🚀 Instruções de como usar:

### 1° Faça seu cadastro ou efetue seu login

Essa etapa é simples e fácil, crie seu usuário, para que suas vacinas possam ficar salvas na plataforma web.

### 2° Cadastre sua primeira vacina

Cadastre manualmente sua vacina, informando qual é a vacina, a data que tomou, o local (se foi na rede pública SUS, ou na rede privada), qual dose tomou (primeira, segunda, única...), e a qual enfermidade ela é destinada.

### 3° Edite ou remova vacinas já cadastradas

Caso seja necessário, clique no botao "editar" pra alterar alguma informação. Agora, caso necessite remover a vacina, clique em "excluir", e confirme a exclusão da vacina.

### 4 Acessando as unidade de saúde próximas 

A pesquisa é muito simples, basta selecionar o tipo de estabelecimento e selecionar seu bairro, e o sistema irá lhe entregar até 10 unidades próximas e relevantes.

### 5 Informe-se no portal de notícias 

O portal entrega as 10 notícias mais relevantes no ambito de saúde. Você pode aplicar filtros para visualizar assuntos específicos, como "nutrição" por exemplo.

---

## Sugestões de melhorias a serem implementadas
Nas próximas versões, traremos a possibilidade de extrair um relatório de todos os registros de vacinas cadastradas.
### 
