/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type OperationType = '+' | '-' | '*' | '/';

export interface CalculationResult {
  success: boolean;
  operation: string;
  num1: number;
  num2: number;
  result?: number;
  formattedOutput: string;
  errorMessage?: string;
  codeTrace: CodeTraceStep[];
}

export interface CodeTraceStep {
  lineNumber: number;
  codeLine: string;
  explanation: string;
  state: {
    num1?: number | string;
    num2?: number | string;
    operacao?: string;
    resultado?: number | string;
    status?: string;
  };
}

export function executePythonCalculator(
  num1Input: string | number,
  opInput: string,
  num2Input: string | number
): CalculationResult {
  const op = (typeof opInput === 'string' ? opInput.trim() : opInput);

  // Check parsing
  const n1 = typeof num1Input === 'number' ? num1Input : parseFloat(String(num1Input).replace(',', '.'));
  const n2 = typeof num2Input === 'number' ? num2Input : parseFloat(String(num2Input).replace(',', '.'));

  const trace: CodeTraceStep[] = [];

  // Step 1: Presentation
  trace.push({
    lineNumber: 7,
    codeLine: 'print("--- CALCULADORA SIMPLES ---")',
    explanation: 'O comando print() imprime na tela o cabeçalho e o menu de opções para orientar o usuário.',
    state: {},
  });

  // Step 2: Input 1
  trace.push({
    lineNumber: 16,
    codeLine: 'num1 = float(input("Digite o primeiro número: "))',
    explanation: `input() capturou o texto digitado e float() converteu para número decimal. num1 agora vale ${isNaN(n1) ? 'inválido' : n1}.`,
    state: { num1: isNaN(n1) ? 'Erro de Conversão' : n1 },
  });

  if (isNaN(n1)) {
    return {
      success: false,
      operation: op,
      num1: NaN,
      num2: NaN,
      formattedOutput: 'ValueError: could not convert string to float',
      errorMessage: 'Valor do primeiro número não é um número válido.',
      codeTrace: trace,
    };
  }

  // Step 3: Input Op
  trace.push({
    lineNumber: 17,
    codeLine: 'operacao = input("Digite a operação (+, -, *, /): ")',
    explanation: `Capturou a operação matemática desejada: '${op}'. Em Python, strings são comparadas com ==.`,
    state: { num1: n1, operacao: op },
  });

  // Step 4: Input 2
  trace.push({
    lineNumber: 18,
    codeLine: 'num2 = float(input("Digite o segundo número: "))',
    explanation: `input() capturou e float() converteu o segundo número. num2 agora vale ${isNaN(n2) ? 'inválido' : n2}.`,
    state: { num1: n1, operacao: op, num2: isNaN(n2) ? 'Erro de Conversão' : n2 },
  });

  if (isNaN(n2)) {
    return {
      success: false,
      operation: op,
      num1: n1,
      num2: NaN,
      formattedOutput: 'ValueError: could not convert string to float',
      errorMessage: 'Valor do segundo número não é um número válido.',
      codeTrace: trace,
    };
  }

  // Step 5: Conditional evaluation
  if (op === '+') {
    trace.push({
      lineNumber: 22,
      codeLine: 'if operacao == "+":',
      explanation: 'Condição VERDADEIRA! O operador é "+". O fluxo entra neste bloco.',
      state: { num1: n1, operacao: op, num2: n2 },
    });
    const res = n1 + n2;
    trace.push({
      lineNumber: 23,
      codeLine: '    resultado = num1 + num2',
      explanation: `Calculou a soma de ${n1} + ${n2} = ${res}. Armazenou a resposta na variável 'resultado'.`,
      state: { num1: n1, operacao: op, num2: n2, resultado: res },
    });
    trace.push({
      lineNumber: 24,
      codeLine: '    print(f"Resultado: {num1} + {num2} = {resultado}")',
      explanation: `Exibiu a resposta usando f-string: "Resultado: ${n1} + ${n2} = ${res}"`,
      state: { num1: n1, operacao: op, num2: n2, resultado: res, status: 'Finalizado' },
    });

    return {
      success: true,
      operation: '+',
      num1: n1,
      num2: n2,
      result: res,
      formattedOutput: `Resultado: ${n1} + ${n2} = ${res}`,
      codeTrace: trace,
    };
  } else if (op === '-') {
    trace.push({
      lineNumber: 26,
      codeLine: 'elif operacao == "-":',
      explanation: 'Primeiro if foi falso, mas este elif é VERDADEIRO! O operador é "-".',
      state: { num1: n1, operacao: op, num2: n2 },
    });
    const res = n1 - n2;
    trace.push({
      lineNumber: 27,
      codeLine: '    resultado = num1 - num2',
      explanation: `Calculou a subtração de ${n1} - ${n2} = ${res}.`,
      state: { num1: n1, operacao: op, num2: n2, resultado: res },
    });
    trace.push({
      lineNumber: 28,
      codeLine: '    print(f"Resultado: {num1} - {num2} = {resultado}")',
      explanation: `Exibiu o resultado formatado: "Resultado: ${n1} - ${n2} = ${res}"`,
      state: { num1: n1, operacao: op, num2: n2, resultado: res, status: 'Finalizado' },
    });

    return {
      success: true,
      operation: '-',
      num1: n1,
      num2: n2,
      result: res,
      formattedOutput: `Resultado: ${n1} - ${n2} = ${res}`,
      codeTrace: trace,
    };
  } else if (op === '*') {
    trace.push({
      lineNumber: 30,
      codeLine: 'elif operacao == "*":',
      explanation: 'Condição VERDADEIRA! O operador é "*". Entrando no bloco de multiplicação.',
      state: { num1: n1, operacao: op, num2: n2 },
    });
    const res = n1 * n2;
    trace.push({
      lineNumber: 31,
      codeLine: '    resultado = num1 * num2',
      explanation: `Calculou o produto de ${n1} * ${n2} = ${res}.`,
      state: { num1: n1, operacao: op, num2: n2, resultado: res },
    });
    trace.push({
      lineNumber: 32,
      codeLine: '    print(f"Resultado: {num1} * {num2} = {resultado}")',
      explanation: `Exibiu o resultado formatado: "Resultado: ${n1} * ${n2} = ${res}"`,
      state: { num1: n1, operacao: op, num2: n2, resultado: res, status: 'Finalizado' },
    });

    return {
      success: true,
      operation: '*',
      num1: n1,
      num2: n2,
      result: res,
      formattedOutput: `Resultado: ${n1} * ${n2} = ${res}`,
      codeTrace: trace,
    };
  } else if (op === '/') {
    trace.push({
      lineNumber: 34,
      codeLine: 'elif operacao == "/":',
      explanation: 'Condição VERDADEIRA! O operador é "/". Entrando no bloco de divisão.',
      state: { num1: n1, operacao: op, num2: n2 },
    });

    if (n2 === 0) {
      trace.push({
        lineNumber: 36,
        codeLine: '    if num2 != 0:',
        explanation: 'FALSO! num2 é igual a 0. Não podemos dividir por zero.',
        state: { num1: n1, operacao: op, num2: n2 },
      });
      trace.push({
        lineNumber: 39,
        codeLine: '    else:',
        explanation: 'Desviou para o bloco de erro seguro.',
        state: { num1: n1, operacao: op, num2: n2 },
      });
      trace.push({
        lineNumber: 40,
        codeLine: '        print("Erro: Não é possível dividir por zero!")',
        explanation: 'Mensagem de proteção exibida com sucesso sem quebrar o programa!',
        state: { num1: n1, operacao: op, num2: n2, status: 'Erro Protegido' },
      });

      return {
        success: false,
        operation: '/',
        num1: n1,
        num2: n2,
        formattedOutput: 'Erro: Não é possível dividir por zero!',
        errorMessage: 'Divisão por zero evitada.',
        codeTrace: trace,
      };
    } else {
      trace.push({
        lineNumber: 36,
        codeLine: '    if num2 != 0:',
        explanation: `VERDADEIRO! num2 é ${n2} (diferente de zero), logo a divisão é segura.`,
        state: { num1: n1, operacao: op, num2: n2 },
      });
      const res = n1 / n2;
      trace.push({
        lineNumber: 37,
        codeLine: '        resultado = num1 / num2',
        explanation: `Calculou a divisão de ${n1} / ${n2} = ${res}.`,
        state: { num1: n1, operacao: op, num2: n2, resultado: res },
      });
      trace.push({
        lineNumber: 38,
        codeLine: '        print(f"Resultado: {num1} / {num2} = {resultado}")',
        explanation: `Exibiu o quociente formatado: "Resultado: ${n1} / ${n2} = ${res}"`,
        state: { num1: n1, operacao: op, num2: n2, resultado: res, status: 'Finalizado' },
      });

      return {
        success: true,
        operation: '/',
        num1: n1,
        num2: n2,
        result: res,
        formattedOutput: `Resultado: ${n1} / ${n2} = ${res}`,
        codeTrace: trace,
      };
    }
  } else {
    trace.push({
      lineNumber: 42,
      codeLine: 'else:',
      explanation: `Nenhuma das 4 operações anteriores coincidiu com '${op}'. O fluxo cai no else geral de segurança.`,
      state: { num1: n1, operacao: op, num2: n2 },
    });
    trace.push({
      lineNumber: 44,
      codeLine: '    print(f"Operação inválida \'{operacao}\'! Escolha apenas +, -, * ou /.")',
      explanation: `Aviso informativo sobre o símbolo inválido '${op}'.`,
      state: { num1: n1, operacao: op, num2: n2, status: 'Operação Inválida' },
    });

    return {
      success: false,
      operation: op,
      num1: n1,
      num2: n2,
      formattedOutput: `Operação inválida '${op}'! Escolha apenas +, -, * ou /.`,
      errorMessage: `Símbolo '${op}' não reconhecido.`,
      codeTrace: trace,
    };
  }
}
