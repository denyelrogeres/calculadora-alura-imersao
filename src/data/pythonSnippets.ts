/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PythonVersion {
  id: string;
  title: string;
  badge: string;
  description: string;
  code: string;
  lineExplanations: Record<number, string>;
}

export const PYTHON_VERSIONS: PythonVersion[] = [
  {
    id: 'basic',
    title: 'Versão 1: Iniciante Absoluto (Linear com if/elif/else)',
    badge: 'Recomendado para Começar',
    description: 'Código direto, sequencial e muito fácil de entender. Ideal para o primeiro dia de aprendizado.',
    code: `# ========================================================
# CALCULADORA BÁSICA EM PYTHON
# Feita para quem está começando na programação!
# ========================================================

# PASSO 1: Exibir uma mensagem de boas-vindas e o menu
print("=================================")
print("     CALCULADORA EM PYTHON       ")
print("=================================")
print("Operações disponíveis:")
print("  +  : Soma")
print("  -  : Subtração")
print("  *  : Multiplicação")
print("  /  : Divisão")
print("---------------------------------")

# PASSO 2: Receber os dados do usuário
# Usamos float() porque input() sempre lê texto (str).
# O float() transforma o texto em um número com casas decimais.
num1 = float(input("Digite o primeiro número: "))
operacao = input("Digite o símbolo da operação (+, -, *, /): ")
num2 = float(input("Digite o segundo número: "))

print("---------------------------------")

# PASSO 3: Tomada de decisão lógica (if / elif / else)
# O computador testa cada condição na ordem, de cima para baixo:

if operacao == "+":
    resultado = num1 + num2
    print(f"Resultado: {num1} + {num2} = {resultado}")

elif operacao == "-":
    resultado = num1 - num2
    print(f"Resultado: {num1} - {num2} = {resultado}")

elif operacao == "*":
    resultado = num1 * num2
    print(f"Resultado: {num1} * {num2} = {resultado}")

elif operacao == "/":
    # REGRA DE OURO: Na matemática não existe divisão por zero!
    if num2 != 0:
        resultado = num1 / num2
        print(f"Resultado: {num1} / {num2} = {resultado}")
    else:
        print("Erro: Não é possível dividir um número por zero!")

else:
    # Se o usuário digitou qualquer símbolo que não seja +, -, * ou /
    print(f"Operação '{operacao}' inválida! Por favor, escolha +, -, * ou /.")

print("=================================")
print("Fim do cálculo. Até a próxima!")
`,
    lineExplanations: {
      1: 'Comentário de cabeçalho: linhas que começam com # são ignoradas pelo Python e servem para humanos lerem.',
      6: 'Comentário explicando o primeiro passo do programa.',
      7: 'print() envia uma mensagem para a tela (console do terminal).',
      12: 'Mostra as opções de operações para que o usuário saiba o que digitar.',
      18: 'input() pausa a execução e espera o usuário digitar. float() converte o texto para número decimal.',
      19: 'operacao guarda o caractere digitado (+, -, *, /) como uma string (texto).',
      20: 'Captura o segundo número do cálculo.',
      26: 'if verifica se a variável operacao é exatamente igual a "+". Note o operador de comparação "==".',
      27: 'Indentação: 4 espaços obrigatórios no Python indicando que esta linha só roda se o if for verdadeiro.',
      28: 'f-string: o "f" antes das aspas permite colocar variáveis diretamente entre chaves {num1}.',
      30: 'elif (abreviação de else if): se o if anterior foi falso, testa esta nova condição.',
      34: 'Multiplicação em programação usa o caractere asterisco (*).',
      38: 'Divisão usa a barra inclinada (/).',
      40: 'Validação crucial: num2 != 0 verifica se o divisor é diferente de zero.',
      44: 'Caso num2 seja 0, avisa o usuário educadamente em vez de deixar o programa travar.',
      46: 'else: o plano B que roda caso NENHUMA das condições anteriores tenha sido atendida.',
    },
  },
  {
    id: 'functions',
    title: 'Versão 2: Modular (Organizado com Funções def)',
    badge: 'Boas Práticas',
    description: 'Separa cada operação matemática em sua própria função reutilizável. O jeito que programadores profissionais organizam código.',
    code: `# ========================================================
# CALCULADORA MODULAR COM FUNÇÕES EM PYTHON
# Cada operação possui sua própria responsabilidade!
# ========================================================

# Definindo as funções matemáticas com a palavra-chave 'def'
def somar(a, b):
    """Retorna a soma de dois números."""
    return a + b

def subtrair(a, b):
    """Retorna a diferença entre dois números."""
    return a - b

def multiplicar(a, b):
    """Retorna o produto de dois números."""
    return a * b

def dividir(a, b):
    """Retorna a divisão ou uma mensagem de erro se b for zero."""
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b

# Função principal que comanda o fluxo
def calculadora():
    print("--- CALCULADORA COM FUNÇÕES ---")
    n1 = float(input("Primeiro número: "))
    op = input("Operação (+, -, *, /): ")
    n2 = float(input("Segundo número: "))

    if op == "+":
        print(f"Resultado: {somar(n1, n2)}")
    elif op == "-":
        print(f"Resultado: {subtrair(n1, n2)}")
    elif op == "*":
        print(f"Resultado: {multiplicar(n1, n2)}")
    elif op == "/":
        print(f"Resultado: {dividir(n1, n2)}")
    else:
        print("Operação inválida!")

# Chamada para iniciar o programa
if __name__ == "__main__":
    calculadora()
`,
    lineExplanations: {
      6: 'def cria uma função reutilizável chamada somar que aceita dois parâmetros (a e b).',
      7: 'Docstring: texto explicativo que documenta o que a função faz.',
      8: 'return devolve o resultado calculado para quem chamou a função.',
      18: 'A função dividir protege internamente contra a divisão por zero.',
      24: 'calculadora() agrupa toda a interface de usuário de forma limpa.',
      40: 'Padrão idiomático do Python: só executa calculadora() se o arquivo for rodado diretamente.',
    },
  },
  {
    id: 'loop',
    title: 'Versão 3: Loop Contínuo & Tratamento de Erros (try/except)',
    badge: 'Robusto & Interativo',
    description: 'Calculadora que nunca fecha sozinha e não trava se o usuário digitar letras no lugar de números.',
    code: `# ========================================================
# CALCULADORA COMPLETA COM LOOP while E try/except
# Robusta contra erros de digitação e contínua!
# ========================================================

print("Bem-vindo à Calculadora Contínua!")
print("Digite 's' ou 'sair' a qualquer momento para encerrar.")

while True:
    print("\\n-----------------------------------")
    
    # 1. Tratamento de exceções: impede que o programa quebre se digitarem letras
    try:
        entrada1 = input("Digite o 1º número (ou 's' para sair): ")
        if entrada1.lower() in ['s', 'sair']:
            print("Obrigado por usar a calculadora. Até logo!")
            break  # Sai do loop while
        
        num1 = float(entrada1)
        
        operacao = input("Operação (+, -, *, /): ").strip()
        if operacao.lower() in ['s', 'sair']:
            break
            
        entrada2 = input("Digite o 2º número: ")
        num2 = float(entrada2)

    except ValueError:
        print("Atenção: Por favor, digite números válidos!")
        continue  # Reinicia o loop do começo

    # 2. Execução da conta
    if operacao == "+":
        print(f"-> {num1} + {num2} = {num1 + num2}")
    elif operacao == "-":
        print(f"-> {num1} - {num2} = {num1 - num2}")
    elif operacao == "*":
        print(f"-> {num1} * {num2} = {num1 * num2}")
    elif operacao == "/":
        if num2 != 0:
            print(f"-> {num1} / {num2} = {num1 / num2}")
        else:
            print("-> Erro matemático: Divisão por zero não permitida.")
    else:
        print(f"-> Operação '{operacao}' inválida!")
`,
    lineExplanations: {
      10: 'while True cria um loop infinito que mantém a calculadora aberta até o usuário decidir sair.',
      14: 'try: tenta executar o bloco. Se der algum erro (como tentar converter "abc" em float), pula para o except.',
      18: 'break interrompe e encerra imediatamente o loop while.',
      28: 'except ValueError: captura o erro de valor inválido sem fechar o terminal do usuário.',
      30: 'continue pula o restante do código da rodada e volta ao início do while.',
    },
  },
];

export interface ConceptItem {
  id: string;
  title: string;
  iconName: string;
  pythonSyntax: string;
  summary: string;
  explanation: string;
  codeSnippet: string;
  beginnerTip: string;
}

export const CONCEPTS: ConceptItem[] = [
  {
    id: 'variables',
    title: 'Variáveis e Tipos de Dados',
    iconName: 'Box',
    pythonSyntax: 'num1 = 10.5',
    summary: 'Espaços na memória do computador para guardar informações.',
    explanation: 'Em Python, você não precisa declarar o tipo antes. Se você atribui 10, vira int (inteiro). Se atribui 10.5, vira float (decimal). Para a calculadora, usamos float para que o usuário possa somar valores como 2.5 + 3.7.',
    codeSnippet: `# Números inteiros (int)
idade = 20

# Números decimais com ponto (float)
preco = 19.99

# Textos entre aspas (str)
nome = "Python"`,
    beginnerTip: 'No Python, usamos PONTO para casas decimais (ex: 3.14), e não vírgula!',
  },
  {
    id: 'input-conversion',
    title: 'Captura (input) e Conversão (float)',
    iconName: 'Keyboard',
    pythonSyntax: 'num1 = float(input("Digite: "))',
    summary: 'Como receber dados do teclado e prepará-los para cálculos.',
    explanation: 'A função input() sempre devolve uma String (texto). Se você fizer "5" + "5", o Python junta as letras e dá "55" (concatenação) em vez de 10! Por isso precisamos "embrulhar" com float(), transformando o texto em número de verdade.',
    codeSnippet: `# O jeito ERRADO (vai juntar os textos):
# x = input("Digite: ")  -> Digita 5
# y = input("Digite: ")  -> Digita 5
# print(x + y)           -> Mostra "55"!

# O jeito CORRETO (faz a conta):
x = float(input("Digite o 1º número: "))
y = float(input("Digite o 2º número: "))
print(x + y)  # Mostra 10.0`,
    beginnerTip: 'Lembre-se: sem float() ou int(), o Python trata o que você digitou como letras!',
  },
  {
    id: 'conditionals',
    title: 'Estruturas Condicionais (if, elif, else)',
    iconName: 'GitFork',
    pythonSyntax: 'if operacao == "+": ... elif ... else:',
    summary: 'A inteligência do programa: bifurcações que decidem o que fazer.',
    explanation: 'O if avalia se uma afirmação é verdadeira (True) ou falsa (False). Se for verdadeira, executa o bloco de baixo. Se não, parte para o próximo elif. Se nenhuma servir, cai no else final como rede de segurança.',
    codeSnippet: `if operacao == "+":
    # Executa se operacao for "+"
    resultado = a + b
elif operacao == "-":
    # Executa se operacao for "-"
    resultado = a - b
else:
    # Executa para qualquer outra coisa
    print("Opção desconhecida")`,
    beginnerTip: 'Use sempre DOIS sinais de igual (==) para comparar e UM sinal (=) para guardar valor na variável!',
  },
  {
    id: 'indentation',
    title: 'Indentação Obrigatória (4 Espaços)',
    iconName: 'AlignLeft',
    pythonSyntax: '    resultado = num1 + num2',
    summary: 'O recuo visual que define quais linhas pertencem a qual bloco.',
    explanation: 'Enquanto linguagens como C ou Java usam chaves { }, o Python usa a indentação (espaços à esquerda). O que estiver recuado abaixo de um if pertence àquele if.',
    codeSnippet: `if condicao == True:
    print("Estou DENTRO do if!")
    print("Eu também estou dentro!")

print("Estou FORA do if, rodo sempre.")`,
    beginnerTip: 'Aperte a tecla TAB ou 4 espaços. Nunca misture espaços e tabs no mesmo arquivo.',
  },
  {
    id: 'zero-division',
    title: 'Prevenção de Divisão por Zero',
    iconName: 'ShieldAlert',
    pythonSyntax: 'if num2 != 0: ... else: ...',
    summary: 'Proteção essencial contra o temido ZeroDivisionError.',
    explanation: 'Tentar dividir qualquer número por 0 faz o interpretador do Python travar e cuspir um erro vermelho feio na tela. Com a verificação "if num2 != 0", seu programa permanece amigável e profissional.',
    codeSnippet: `if num2 != 0:
    resultado = num1 / num2
    print(resultado)
else:
    print("Não é possível dividir por zero!")`,
    beginnerTip: 'O símbolo != significa "diferente de". Ou seja: "Se num2 for diferente de 0".',
  },
  {
    id: 'fstrings',
    title: 'F-Strings (Formatação Moderna)',
    iconName: 'Sparkles',
    pythonSyntax: 'print(f"Resultado: {resultado}")',
    summary: 'A forma mais limpa e moderna de misturar textos e números no Python.',
    explanation: 'Colocando a letra "f" antes das aspas duplas, qualquer variável ou conta colocada dentro de chaves { } é automaticamente calculada e convertida em texto legível.',
    codeSnippet: `nome = "Ana"
nota = 9.5
print(f"Parabéns {nome}, sua nota foi {nota}!")
# Saída: Parabéns Ana, sua nota foi 9.5!`,
    beginnerTip: 'Muito melhor do que fazer print("Parabéns " + nome + " nota: " + str(nota))!',
  },
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Por que usamos a função float() ao receber dados com input() em uma calculadora?',
    options: [
      'Porque o input() sempre retorna uma String (texto), e precisamos de números para calcular.',
      'Porque o Python não aceita números sem a palavra float antes.',
      'Apenas por estética para deixar o código mais bonito.',
      'Para fazer o computador processar a conta 10 vezes mais rápido.',
    ],
    correctIndex: 0,
    explanation: 'Exato! A função input() sempre lê dados como texto (tipo str). Se somarmos "2" + "3" sem converter, o resultado é "23" em vez de 5. O float() transforma o texto em número decimal calculável.',
  },
  {
    id: 2,
    question: 'Qual é a diferença entre usar "=" e "==" em Python?',
    options: [
      'Nenhuma diferença, são sinônimos.',
      '"=" atribui um valor a uma variável; "==" compara se dois valores são iguais.',
      '"=" compara valores; "==" cria uma lista de números.',
      '"=" é usado apenas para texto e "==" apenas para números inteiros.',
    ],
    correctIndex: 1,
    explanation: 'Perfeito! "=" é o operador de atribuição (ex: x = 10 guarda 10 em x). "==" é o operador de comparação lógica (ex: if operacao == "+": verifica se é igual).',
  },
  {
    id: 3,
    question: 'O que acontece se executarmos "10 / 0" em Python sem verificar previamente o valor do divisor?',
    options: [
      'O Python retorna automaticamente o valor 0.',
      'O Python inventa um número infinito e continua rodando normalmente.',
      'O programa é interrompido com a exceção ZeroDivisionError.',
      'O computador desliga o monitor.',
    ],
    correctIndex: 2,
    explanation: 'Correto! Na matemática a divisão por zero é indefinida. Sem a verificação if num2 != 0, o Python lança a exceção ZeroDivisionError e o programa para abruptamente.',
  },
  {
    id: 4,
    question: 'Como se chama o recuo de 4 espaços que define os blocos de código (como dentro de um if)?',
    options: [
      'Indentação',
      'Interpolação',
      'Compilação',
      'Recursão',
    ],
    correctIndex: 0,
    explanation: 'Isso aí! Indentação é a marca registrada do Python. É o alinhamento visual de 4 espaços que indica ao interpretador o que pertence a cada if, função ou loop.',
  },
];
