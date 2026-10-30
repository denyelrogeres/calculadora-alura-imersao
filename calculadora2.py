# ========================================================
# CALCULADORA BÁSICA EM PYTHON
# Operações Básicas + Potenciação e Porcentagem
# ========================================================

# PASSO 1: Exibir uma mensagem de apresentação e o menu
print("=================================")
print("     CALCULADORA EM PYTHON       ")
print("=================================")
print("Operações disponíveis:")
print("  +   : Soma")
print("  -   : Subtração")
print("  *   : Multiplicação")
print("  /   : Divisão")
print("  **  : Potenciação (Base elevada ao Expoente)")
print("  %   : Porcentagem (X% de Y)")
print("---------------------------------")

# PASSO 2: Entrada de dados digitados pelo usuário
num1 = float(input("Digite o primeiro número: "))
operacao = input("Digite a operação (+, -, *, /, **, %): ")
num2 = float(input("Digite o segundo número: "))

print("---------------------------------")

# PASSO 3: Tomada de decisão lógica (if / elif / else)

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
    if num2 != 0:
        resultado = num1 / num2
        print(f"Resultado: {num1} / {num2} = {resultado}")
    else:
        print("Erro matemático: Não é possível dividir nenhum número por zero!")

elif operacao == "**":
    # NOVO: Potenciação
    resultado = num1 ** num2
    print(f"Resultado: {num1} elevado a {num2} = {resultado}")

elif operacao == "%":
    # NOVO: Porcentagem
    resultado = (num1 * num2) / 100
    print(f"Resultado: {num1}% de {num2} = {resultado}")

else:
    print(f"Operação '{operacao}' inválida! Por favor, escolha +, -, *, /, ** ou %.")

print("=================================")
print("Fim do cálculo. Até a próxima!")