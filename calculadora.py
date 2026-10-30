    # ========================================================
# CALCULADORA BÁSICA EM PYTHON
# As 4 Operações Matemáticas para Iniciantes
# ========================================================

# PASSO 1: Exibir uma mensagem de apresentação e o menu
print("=================================")
print("     CALCULADORA EM PYTHON       ")
print("=================================")
print("Operações disponíveis:")
print("  +  : Soma")
print("  -  : Subtração")
print("  *  : Multiplicação")
print("  /  : Divisão")
print("---------------------------------")

# PASSO 2: Entrada de dados digitados pelo usuário
# Usamos float() porque a função input() sempre lê texto (str).
# O float() converte o texto para número com casas decimais (ex: 5.0 ou 3.14).
num1 = float(input("Digite o primeiro número: "))
operacao = input("Digite a operação (+, -, *, /): ")
num2 = float(input("Digite o segundo número: "))

print("---------------------------------")

# PASSO 3: Tomada de decisão lógica (if / elif / else)
# O computador testa cada condição na ordem, de cima para baixo:

if operacao == "+":
    # Se o usuário digitou "+", executa a soma
    resultado = num1 + num2
    print(f"Resultado: {num1} + {num2} = {resultado}")

elif operacao == "-":
    # Se o anterior for falso e este for "-", executa a subtração
    resultado = num1 - num2
    print(f"Resultado: {num1} - {num2} = {resultado}")

elif operacao == "*":
    # Em programação, multiplicação usa o símbolo de asterisco (*)
    resultado = num1 * num2
    print(f"Resultado: {num1} * {num2} = {resultado}")

elif operacao == "/":
    # REGRA DE OURO: Na matemática, não existe divisão por zero!
    # O operador '!=' significa "diferente de"
    if num2 != 0:
        resultado = num1 / num2
        print(f"Resultado: {num1} / {num2} = {resultado}")
    else:
        print("Erro matemático: Não é possível dividir nenhum número por zero!")

else:
    # Se o usuário digitou qualquer símbolo que não seja +, -, * ou /
    print(f"Operação '{operacao}' inválida! Por favor, escolha +, -, * ou /.")

print("=================================")
print("Fim do cálculo. Até a próxima!")