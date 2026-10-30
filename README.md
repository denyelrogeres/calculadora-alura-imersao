# 🚀 Imersão em Engenharia de Software - Alura & Google AI Studio & Google Antigravity

Esse é o repositório central da **Imersão em Engenharia de Software com IA** da Alura (de 26/10/2026 à 03/11/2026).

Aqui estão reunidos dois desafios práticos desenvolvidos durante a Imersão. Cada desafio explora uma etapa da formação de um desenvolvedor na era da inteligência artificial: desde lógica fundamental e refatoração com IA até a criação e expansão de aplicações com boas práticas de engenharia de software.

---

## 📌 Visão Geral dos Desafios

### 🔹 Desafio 1: Calculadora com Operações Básicas
O objetivo do primeiro desafio foi construir a lógica inicial de uma calculadora interativa em linha de comando (CLI) utilizando **Python**, cobrindo os conceitos fundamentais de lógica de programação:
* Entrada e saída de dados com `input()` e `print()`;
* Conversão de tipos de dados (`float`);
* Estruturas de controle de fluxo condicional (`if`, `elif`, `else`);
* Implementação das **4 operações fundamentais**:
  * ➕ Soma (`+`)
  * ➖ Subtração (`-`)
  * ✖️ Multiplicação (`*`)
  * ➗ Divisão (`/`) com validação defensiva para impedir erro de divisão por zero.

---

### 🔹 Desafio 2: Expansão e Refatoração com IA
No segundo desafio, utilizamos ferramentas de IA (**Google AI Studio** e **Google Antigravity**) como parceiras de *pair programming* para analisar, explicar e expandir a arquitetura da calculadora, agregando novas funcionalidades matemáticas que utilizam dois operandos:
* **Potenciação (`**`):** Elevação de uma base ao expoente fornecido;
* **Porcentagem (`%`):** Cálculo proporcional de porcentagem ($X\%$ de $Y$) através da expressão matemática `(num1 * num2) / 100`;
* **Tratamento de entradas inválidas:** Feedback claro para o usuário caso um operador não suportado seja inserido.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

* **Linguagem:** Python 3.x
* **Versionamento:** Git & GitHub
* **Engenharia de Software com IA:**
  * Google AI Studio
  * Google Antigravity (Pair Programming & Code Review)

---

## 📂 Estrutura do Repositório

```text
├── desafio-1/
│   └── calculadora_basica.py    # Versão inicial com as 4 operações
├── desafio-2/
│   └── calculadora_avancada.py  # Versão expandida com potência e porcentagem
└── README.md
```

*(Caso você tenha deixado tudo em um único arquivo, pode manter apenas `calculadora.py`)*.

---

## 💻 Como Executar o Projeto

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd NOME_DO_REPOSITORIO
   ```

3. **Execute o arquivo Python:**
   ```bash
   python calculadora.py
   ```

---

## 🧪 Exemplos de Uso

```text
=================================
     CALCULADORA EM PYTHON       
=================================
Operações disponíveis:
  +   : Soma
  -   : Subtração
  *   : Multiplicação
  /   : Divisão
  **  : Potenciação (Base elevada ao Expoente)
  %   : Porcentagem (X% de Y)
---------------------------------
Digite o primeiro número: 15
Digite a operação (+, -, *, /, **, %): %
Digite o segundo número: 200
---------------------------------
Resultado: 15.0% de 200.0 = 30.0
=================================
Fim do cálculo. Até a próxima!
```

---

## 👨‍💻 Autor

Desenvolvido por **[Seu Nome]** durante a Imersão em Engenharia de Software Alura + Google.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/SEU_LINKEDIN)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SEU_USUARIO)
