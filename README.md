# 🛒 Sistema de E-commerce com Gerenciamento de Usuários

## 📄 Descrição

Projeto **Full Stack** de **E-commerce** em desenvolvimento, criado com o objetivo de consolidar conhecimentos em desenvolvimento web, segurança, autenticação, arquitetura de aplicações e persistência de dados utilizando **Node.js**, **PostgreSQL**.

O sistema já conta com **autenticação segura**, **dashboard administrativo**, **gerenciamento de usuários, produtos, endereços e carrinho**, além de **upload de imagens integrado à Cloudinary**, sendo hospedado de forma dinâmica na **Vercel**.

---

## 🚧 Status do Projeto

🚧 **Em desenvolvimento ativo**

O sistema possui diversas funcionalidades completas e outras em constante evolução, principalmente relacionadas ao fluxo completo de e-commerce.  

⚠️ **Observação:** O **fluxo de venda no back-end ainda não está finalizado**, faltando:  
- Baixa automática de estoque  
- Validação completa dos dados da compra  
- Registro correto de **venda** e **itens da venda** no banco  

---

## ⚙️ Funcionalidades Implementadas

### 🔐 Autenticação e Segurança
- Registro de usuários ✅  
- Login de usuários ✅  
- Criptografia de senhas com **Bcrypt** ✅  
- Autenticação com **JWT (JSON Web Token)** ✅  
- Proteção de rotas via **Middleware** ✅  
- Tokens armazenados de forma segura ✅  

---

### 👤 Usuários
- Listagem de usuários no dashboard ✅  
- Atualização de dados do usuário ✅  
- Exclusão de usuários ✅  
- Tela de perfil do usuário ✅  
- Finalização de cadastro com:  
  - Telefone  
  - Endereço  
  - Upload de imagem de perfil  

---

### 🏠 Endereços
- Listagem de endereços vinculados aos usuários ✅  
- Exclusão de endereços ✅  

---

### 📦 Produtos
- Listagem de produtos no dashboard ✅  
- Cadastro de produtos ✅  
- Atualização de produtos ✅  
- Exclusão de produtos ✅  

---

### 🛒 Carrinho e Compra
- Adição de produtos ao carrinho (LocalStorage) ✅  
- Listagem dinâmica do carrinho ✅  
- Alteração de quantidade de itens ✅  
- Remoção de produtos do carrinho ✅  
- Tela de checkout ✅  
- Seleção de método de pagamento (front-end) ✅  
- Envio de dados da compra para o back-end ✅  

⚠️ **Observação:** O fluxo de compra ainda não está completamente finalizado no back-end.  
Faltam:  
- Baixa automática de estoque  
- Validação completa de dados no servidor  
- Registro correto de **venda** e **itens da venda**  

---

### 📊 Dashboard Administrativo
- Página de dashboard ✅  
- Visualização de:  
  - Usuários  
  - Produtos  
  - Endereços  
- Ações de **editar** e **deletar** registros ✅  

---

### ☁️ Upload e Deploy
- Upload de imagens utilizando **Cloudinary** ✅  
- Integração preparada para ambiente serverless (**Vercel**) ✅  

---

## 🚀 Funcionalidades Planejadas / Em Desenvolvimento
- Carrinho de compras completo  
- Sistema de pedidos  
- Finalização de compra com validações no back-end  
- Integração com meios de pagamento  
- Controle de permissões (admin / usuário)  
- Validações avançadas de formulários  
- Melhorias na interface e experiência do usuário (UI/UX)  

---

## 🧰 Tecnologias Utilizadas

### Back-end
- Node.js  
- Express  
- PostgreSQL  
- JWT  
- Bcrypt  

---

### Front-end
- EJS  
- CSS  
- JavaScript  

---

### Infraestrutura e Serviços
- Cloudinary (upload de imagens)  
- Vercel (deploy)  

---

### Ferramentas
- Git  
- GitHub  

---

## 🗂️ Organização do Projeto

O projeto segue uma arquitetura organizada e escalável, baseada na separação de responsabilidades:

- **Routes**: definição das rotas da aplicação  
- **Controllers**: regras de negócio  
- **Models**: comunicação com o banco de dados  
- **Middlewares**: autenticação e proteção de rotas  
- **Services**: camada de abstração para regras reutilizáveis  
- **Utils**: funções auxiliares (criptografia, upload, etc.)  

Essa estrutura facilita a manutenção, escalabilidade e evolução do sistema.

---

## 🎯 Objetivo do Projeto

Este projeto tem como objetivo o **aprendizado prático**, o fortalecimento de conceitos de **Full Stack**, **segurança**, **autenticação**, **integração com banco de dados relacional** e a construção de um **e-commerce completo para portfólio profissional**.

O sistema está sendo desenvolvido com foco em simular cenários reais de mercado, incluindo:  
- Controle de estoque  
- Processamento de pedidos  
- Validações de dados no servidor  
