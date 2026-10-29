import test from 'node:test';
import assert from 'node:assert/strict';
import { executePythonCalculator } from './calculatorEngine';

test('Calculadora Python - Adição básica', () => {
  const result = executePythonCalculator(15, '+', 25);
  assert.equal(result.success, true);
  assert.equal(result.result, 40);
  assert.equal(result.formattedOutput, 'Resultado: 15 + 25 = 40');
  assert.ok(result.codeTrace.length >= 4);
});

test('Calculadora Python - Subtração com decimais', () => {
  const result = executePythonCalculator('10.5', '-', '4.2');
  assert.equal(result.success, true);
  // floating point approximation check
  assert.ok(Math.abs((result.result ?? 0) - 6.3) < 0.0001);
});

test('Calculadora Python - Multiplicação com negativos', () => {
  const result = executePythonCalculator(-6, '*', 7);
  assert.equal(result.success, true);
  assert.equal(result.result, -42);
  assert.equal(result.formattedOutput, 'Resultado: -6 * 7 = -42');
});

test('Calculadora Python - Divisão válida', () => {
  const result = executePythonCalculator(20, '/', 4);
  assert.equal(result.success, true);
  assert.equal(result.result, 5);
  assert.equal(result.formattedOutput, 'Resultado: 20 / 4 = 5');
});

test('Calculadora Python - Prevenção de Divisão por Zero', () => {
  const result = executePythonCalculator(10, '/', 0);
  assert.equal(result.success, false);
  assert.equal(result.formattedOutput, 'Erro: Não é possível dividir por zero!');
  assert.equal(result.errorMessage, 'Divisão por zero evitada.');
  const zeroCheckStep = result.codeTrace.find(t => t.codeLine.includes('Não é possível dividir por zero'));
  assert.ok(zeroCheckStep !== undefined);
});

test('Calculadora Python - Operador inválido', () => {
  const result = executePythonCalculator(10, '^', 2);
  assert.equal(result.success, false);
  assert.ok(result.formattedOutput.includes("Operação inválida '^'"));
});
