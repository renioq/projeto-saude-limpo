# 🏥 Projeto Saúde - Sistema de Apoio à Saúde Pública de Fortaleza

Sistema web desenvolvido com foco em acessibilidade à informação e gestão pessoal de saúde. A aplicação está organizada com **arquitetura de microserviços**, incluindo funcionalidades como:

- Consulta de unidades de saúde por bairro
- Acesso a notícias de saúde (acesso sem necessitar login)
- Gestão de vacinas pessoais (acesso sem necessitar login)
- Cadastro e login de usuários com autenticação JWT

🔗 Acesse o sistema em produção:  
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

### 1° Faça seu cadastro ou efetue login

Essa etapa é simples e fácil, apenas crie um usuário, para que suas vacinas possam ficar salvas em algum ambiente

### 2° Cadastre sua primeira vacina

Cadastre manualmente sua vacina, informando qual é a vacina, a data que tomou, o local (se foi na rede pública SUS, ou na privada), qual dose tomou (primeira, segunda, única...), e a qual enfermidade ela eh destinada.

### 3° Edite ou remova vacinas já cadastradas

Caso seja necessãrio, clique no botao "editar" pra alterar alguma informacao. Agora caso precise remover a vacina, clique em "excluir" e confirme a exclusao da vacina.

### 4 Acessando as unidade proximas

A pesquisa eh muito simples, basta selecionar o tipo de estabelecimento e selecionar seu bairro, e o sistema ira lhe entregar ate 10 unidades proximas e relevantes

### 5 Se informanddo no portal de noticias

O portal ja entrega as 10 noticias mais relevantes no ambito de saude, tendo o filtro que pode ser aplicado para assuntos especificos, como "nutricao".

---

## Sugestoes de melhorias a serem implementadas

### 
