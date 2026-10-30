# Imersão em Engenharia de Software - Alura & Google AI Studio & Google Antigravity

Esse é o repositório central da **Imersão em Engenharia de Software com IA** da Alura (de 26/10/2026 à 03/11/2026).

Aqui estão reunidos dois desafios práticos desenvolvidos durante a Imersão. Cada desafio explora uma etapa da formação de um desenvolvedor na era da inteligência artificial: desde lógica fundamental e refatoração com IA até a criação e expansão de aplicações com boas práticas de engenharia de software.

---

## Visão Geral dos Desafios

### Desafio 1: Calculadora com Operações Básicas

O objetivo do primeiro desafio foi construir a lógica inicial de uma calculadora interativa em linha de comando (CLI) utilizando **Python**, com apoio do **Google AI Studio**, cobrindo os conceitos fundamentais de lógica de programação:

* Estruturação do raciocínio lógico para resolver o problema;
* Funções modulares (`def`), organizando o código em blocos reutilizáveis;
* Entrada e saída de dados com `input()` e `print()`;
* Conversão de tipos de dados (`float`);
* Estruturas de controle de fluxo condicional (`if`, `elif`, `else`);
* Implementação das **4 operações fundamentais**:
  * Soma (`+`)
  * Subtração (`-`)
  * Multiplicação (`*`)
  * Divisão (`/`) com validação defensiva para impedir erro de divisão por zero, garantindo a estabilidade do script.

#### Como executar

1. Certifique-se de ter o Python instalado na sua máquina.
2. Execute o script diretamente pelo terminal:

```bash
python calculadora.py
```

---

### Desafio 2: Expansão e Refatoração com IA

No segundo desafio, utilizamos ferramentas de IA (**Google AI Studio** e **Google Antigravity**) como parceiras de *pair programming* para analisar, explicar e expandir a arquitetura da calculadora, simulando o fluxo real de Engenharia de Software em 3 etapas:

1. **Explorar:** mapear a arquitetura e as responsabilidades dos módulos existentes;
2. **Evoluir:** implementar novas funcionalidades matemáticas que utilizam dois operandos;
3. **Testar:** validar cenários de borda e garantir a ausência de regressões nas funções anteriores.

As novas funcionalidades adicionadas foram:

* **Potenciação (`**`):** elevação de uma base ao expoente fornecido;
* **Porcentagem (`%`):** cálculo proporcional de porcentagem ($X\%$ de $Y$) através da expressão matemática `(num1 * num2) / 100`;
* **Tratamento de entradas inválidas:** feedback claro para o usuário caso um operador não suportado seja inserido.

Foram feitas pequenas alterações no código da calculadora original para incluir essas funções, mantendo o que já funcionava.

#### Como executar

Do mesmo jeito que a calculadora básica:

1. Certifique-se de que o Python está devidamente instalado na sua máquina.
2. Execute o script diretamente pelo terminal:

```bash
python calculadora_porcentagem.py
```

---

## Tecnologias e Ferramentas Utilizadas

* **Linguagem:** Python 3.x
* **Versionamento:** Git & GitHub
* **Engenharia de Software com IA:**
  * Google AI Studio
  * Google Antigravity (Pair Programming & Code Review)

---

## Autor

Denyel Rógeres 

Acesse meu perfil no [LinkedIn](https://www.linkedin.com/in/denyelrogeres).
