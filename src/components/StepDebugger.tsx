/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Play, SkipForward, RotateCcw, AlertTriangle, CheckCircle2, Cpu } from 'lucide-react';
import { executePythonCalculator, CalculationResult, CodeTraceStep } from '../utils/calculatorEngine';

interface StepDebuggerProps {
  onHighlightLine: (lineNum: number | null) => void;
}

export const StepDebugger: React.FC<StepDebuggerProps> = ({ onHighlightLine }) => {
  const [num1, setNum1] = useState<string>('15');
  const [op, setOp] = useState<string>('+');
  const [num2, setNum2] = useState<string>('5');

  const [activeTrace, setActiveTrace] = useState<CalculationResult | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);

  const presets = [
    { label: 'Soma: 15 + 25', n1: '15', o: '+', n2: '25' },
    { label: 'Subtração: 50 - 18', n1: '50', o: '-', n2: '18' },
    { label: 'Multiplicação: 7 × 8', n1: '7', o: '*', n2: '8' },
    { label: 'Divisão: 40 ÷ 8', n1: '40', o: '/', n2: '8' },
    { label: 'Divisão por 0: 10 ÷ 0', n1: '10', o: '/', n2: '0', isEdge: true },
    { label: 'Símbolo Inválido: 9 % 3', n1: '9', o: '%', n2: '3', isEdge: true },
  ];

  const handleRunAll = () => {
    const res = executePythonCalculator(num1, op, num2);
    setActiveTrace(res);
    setCurrentStepIndex(res.codeTrace.length - 1);
    const lastStep = res.codeTrace[res.codeTrace.length - 1];
    onHighlightLine(lastStep.lineNumber);
  };

  const handleStartStepByStep = () => {
    const res = executePythonCalculator(num1, op, num2);
    setActiveTrace(res);
    setCurrentStepIndex(0);
    onHighlightLine(res.codeTrace[0].lineNumber);
  };

  const handleNextStep = () => {
    if (!activeTrace) {
      handleStartStepByStep();
      return;
    }
    if (currentStepIndex < activeTrace.codeTrace.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      onHighlightLine(activeTrace.codeTrace[nextIdx].lineNumber);
    }
  };

  const handleReset = () => {
    setActiveTrace(null);
    setCurrentStepIndex(-1);
    onHighlightLine(null);
  };

  const selectPreset = (p: typeof presets[0]) => {
    setNum1(p.n1);
    setOp(p.o);
    setNum2(p.n2);
    const res = executePythonCalculator(p.n1, p.o, p.n2);
    setActiveTrace(res);
    setCurrentStepIndex(res.codeTrace.length - 1);
    onHighlightLine(res.codeTrace[res.codeTrace.length - 1].lineNumber);
  };

  const currentStep: CodeTraceStep | null =
    activeTrace && currentStepIndex >= 0 ? activeTrace.codeTrace[currentStepIndex] : null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Simulador Visual Passo a Passo</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Veja exatamente como o interpretador do Python lê linha por linha e avalia as condições.
          </p>
        </div>

        {/* Quick presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-slate-500 font-medium mr-1">Exemplos rápidos:</span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => selectPreset(p)}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer border ${
                p.isEdge
                  ? 'bg-amber-950/40 text-amber-300 border-amber-800/60 hover:bg-amber-900/40'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700/60 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">
            1º Número (<code className="text-sky-400">num1</code>):
          </label>
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Ex: 15"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">
            Operação (<code className="text-purple-400">operacao</code>):
          </label>
          <select
            value={op}
            onChange={(e) => setOp(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="+">+ (Soma)</option>
            <option value="-">- (Subtração)</option>
            <option value="*">* (Multiplicação)</option>
            <option value="/">/ (Divisão)</option>
            <option value="%">% (Inválido para teste)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">
            2º Número (<code className="text-sky-400">num2</code>):
          </label>
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Ex: 5"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={handleRunAll}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-lg shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Executar Tudo</span>
          </button>

          <button
            onClick={
              !activeTrace || currentStepIndex === activeTrace.codeTrace.length - 1
                ? handleStartStepByStep
                : handleNextStep
            }
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-lg shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <SkipForward className="w-4 h-4" />
            <span>
              {!activeTrace || currentStepIndex === -1
                ? 'Iniciar Passo a Passo'
                : currentStepIndex < activeTrace.codeTrace.length - 1
                ? `Próximo Passo (${currentStepIndex + 1}/${activeTrace.codeTrace.length})`
                : 'Reiniciar Passo a Passo'}
            </span>
          </button>

          {activeTrace && (
            <button
              onClick={handleReset}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
              title="Limpar simulação"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        {activeTrace && (
          <div className="text-xs font-medium text-slate-400">
            Passo{' '}
            <span className="text-white font-bold">{currentStepIndex + 1}</span> de{' '}
            <span className="text-white font-bold">{activeTrace.codeTrace.length}</span>
          </div>
        )}
      </div>

      {/* Step Breakdown Card */}
      {currentStep && (
        <div className="bg-slate-950/90 border border-indigo-900/60 rounded-xl p-4 flex flex-col gap-3 transition-all animate-fadeIn">
          {/* Current line banner */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
                Linha {currentStep.lineNumber}
              </span>
              <code className="text-xs sm:text-sm font-mono text-emerald-300 font-semibold">
                {currentStep.codeLine}
              </code>
            </div>

            {currentStep.state.status && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {currentStep.state.status}
              </span>
            )}
          </div>

          {/* Explanation */}
          <div className="text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
            <strong className="text-indigo-300 block text-xs uppercase tracking-wider mb-1">
              O que o computador está fazendo neste momento:
            </strong>
            {currentStep.explanation}
          </div>

          {/* Memory Inspector / Variables State */}
          <div className="mt-1">
            <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
              <span>Memória RAM (Estado das Variáveis no Python):</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px]">num1 (float)</span>
                <span className="text-sky-300 font-bold">
                  {currentStep.state.num1 !== undefined ? String(currentStep.state.num1) : 'não definido'}
                </span>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px]">operacao (str)</span>
                <span className="text-purple-300 font-bold">
                  {currentStep.state.operacao !== undefined
                    ? `'${currentStep.state.operacao}'`
                    : 'não definido'}
                </span>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px]">num2 (float)</span>
                <span className="text-sky-300 font-bold">
                  {currentStep.state.num2 !== undefined ? String(currentStep.state.num2) : 'não definido'}
                </span>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[10px]">resultado</span>
                <span
                  className={`font-bold ${
                    currentStep.state.resultado !== undefined
                      ? 'text-emerald-400'
                      : 'text-slate-600'
                  }`}
                >
                  {currentStep.state.resultado !== undefined
                    ? String(currentStep.state.resultado)
                    : 'aguardando...'}
                </span>
              </div>
            </div>
          </div>

          {/* Final Outcome banner if at end */}
          {currentStepIndex === activeTrace.codeTrace.length - 1 && (
            <div
              className={`p-3 rounded-lg border flex items-center gap-3 text-sm font-medium ${
                activeTrace.success
                  ? 'bg-emerald-950/40 text-emerald-200 border-emerald-800/60'
                  : 'bg-amber-950/40 text-amber-200 border-amber-800/60'
              }`}
            >
              {activeTrace.success ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              )}
              <div className="flex-1">
                <div className="font-semibold text-xs uppercase tracking-wider mb-0.5">
                  Saída Final no Terminal:
                </div>
                <div className="font-mono text-white text-base">
                  {activeTrace.formattedOutput}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
