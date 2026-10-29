/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, CornerDownLeft } from 'lucide-react';
import { executePythonCalculator } from '../utils/calculatorEngine';

type TerminalStep = 'idle' | 'awaiting_num1' | 'awaiting_op' | 'awaiting_num2' | 'finished';

interface LogLine {
  text: string;
  type: 'prompt' | 'input' | 'output' | 'error' | 'success' | 'system';
}

export const TerminalSimulator: React.FC = () => {
  const [step, setStep] = useState<TerminalStep>('idle');
  const [logs, setLogs] = useState<LogLine[]>([
    { text: 'Python 3.11.4 (default, interactive session)', type: 'system' },
    { text: "Digite 'python calculadora.py' ou clique em Iniciar para rodar.", type: 'system' },
  ]);

  const [inputVal, setInputVal] = useState<string>('');
  const [num1Val, setNum1Val] = useState<string>('');
  const [opVal, setOpVal] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [logs]);

  const startScript = () => {
    setLogs([
      { text: '$ python calculadora.py', type: 'prompt' },
      { text: '=================================', type: 'output' },
      { text: '     CALCULADORA EM PYTHON       ', type: 'output' },
      { text: '=================================', type: 'output' },
      { text: 'Operações disponíveis:', type: 'output' },
      { text: '  +  : Soma', type: 'output' },
      { text: '  -  : Subtração', type: 'output' },
      { text: '  *  : Multiplicação', type: 'output' },
      { text: '  /  : Divisão', type: 'output' },
      { text: '---------------------------------', type: 'output' },
      { text: 'Digite o primeiro número: ', type: 'prompt' },
    ]);
    setStep('awaiting_num1');
    setInputVal('');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleQuickRun = (n1: string, o: string, n2: string) => {
    const res = executePythonCalculator(n1, o, n2);
    setLogs([
      { text: '$ python calculadora.py', type: 'prompt' },
      { text: '=================================', type: 'output' },
      { text: '     CALCULADORA EM PYTHON       ', type: 'output' },
      { text: '=================================', type: 'output' },
      { text: `Digite o primeiro número: ${n1}`, type: 'input' },
      { text: `Digite o símbolo da operação (+, -, *, /): ${o}`, type: 'input' },
      { text: `Digite o segundo número: ${n2}`, type: 'input' },
      { text: '---------------------------------', type: 'output' },
      {
        text: res.formattedOutput,
        type: res.success ? 'success' : 'error',
      },
      { text: '=================================', type: 'output' },
      { text: 'Fim do cálculo. Até a próxima!', type: 'system' },
    ]);
    setStep('finished');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() && step === 'idle') {
      startScript();
      return;
    }

    const val = inputVal.trim();
    if (step === 'idle') {
      if (val.toLowerCase().includes('python') || val === 'run') {
        startScript();
      } else {
        setLogs((prev) => [
          ...prev,
          { text: `$ ${val}`, type: 'prompt' },
          { text: "Comando não reconhecido. Digite 'python calculadora.py' para iniciar.", type: 'error' },
        ]);
        setInputVal('');
      }
      return;
    }

    if (step === 'awaiting_num1') {
      setNum1Val(val);
      setLogs((prev) => [
        ...prev.slice(0, -1),
        { text: `Digite o primeiro número: ${val}`, type: 'input' },
        { text: 'Digite o símbolo da operação (+, -, *, /): ', type: 'prompt' },
      ]);
      setStep('awaiting_op');
      setInputVal('');
      return;
    }

    if (step === 'awaiting_op') {
      setOpVal(val);
      setLogs((prev) => [
        ...prev.slice(0, -1),
        { text: `Digite o símbolo da operação (+, -, *, /): ${val}`, type: 'input' },
        { text: 'Digite o segundo número: ', type: 'prompt' },
      ]);
      setStep('awaiting_num2');
      setInputVal('');
      return;
    }

    if (step === 'awaiting_num2') {
      const res = executePythonCalculator(num1Val, opVal, val);
      setLogs((prev) => [
        ...prev.slice(0, -1),
        { text: `Digite o segundo número: ${val}`, type: 'input' },
        { text: '---------------------------------', type: 'output' },
        {
          text: res.formattedOutput,
          type: res.success ? 'success' : 'error',
        },
        { text: '=================================', type: 'output' },
        { text: 'Fim do cálculo. Até a próxima!', type: 'system' },
      ]);
      setStep('finished');
      setInputVal('');
    }
  };

  const handleClear = () => {
    setLogs([
      { text: 'Terminal limpo.', type: 'system' },
      { text: "Clique em 'Iniciar Programa' para rodar uma nova conta.", type: 'system' },
    ]);
    setStep('idle');
    setInputVal('');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Terminal Python Interativo</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Experimente a experiência real de rodar o script no terminal do seu computador.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          {step === 'idle' || step === 'finished' ? (
            <button
              onClick={startScript}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Iniciar Programa</span>
            </button>
          ) : (
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Cancelar</span>
            </button>
          )}

          <button
            onClick={handleClear}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            title="Limpar terminal"
          >
            Limpar
          </button>
        </div>
      </div>

      {/* Preset test cases */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[11px] text-slate-500 font-medium">Testes automáticos:</span>
        <button
          onClick={() => handleQuickRun('10', '+', '5')}
          className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
        >
          10 + 5
        </button>
        <button
          onClick={() => handleQuickRun('100', '-', '35')}
          className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
        >
          100 - 35
        </button>
        <button
          onClick={() => handleQuickRun('8', '*', '7')}
          className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
        >
          8 * 7
        </button>
        <button
          onClick={() => handleQuickRun('50', '/', '5')}
          className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
        >
          50 / 5
        </button>
        <button
          onClick={() => handleQuickRun('20', '/', '0')}
          className="text-xs px-2.5 py-1 rounded bg-rose-950/40 text-rose-300 border border-rose-800/60 hover:bg-rose-900/40 cursor-pointer"
        >
          20 / 0 (Zero)
        </button>
      </div>

      {/* Terminal Window Box */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-xl overflow-hidden shadow-inner flex flex-col font-mono text-xs sm:text-sm">
        {/* Window controls bar */}
        <div className="bg-slate-950 px-4 py-2 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-2 text-slate-400 text-xs">bash - python3 calculadora.py</span>
          </div>
          <span className="text-[11px] text-slate-600">utf-8</span>
        </div>

        {/* Scrollable Output */}
        <div ref={terminalScrollRef} className="p-4 space-y-1.5 min-h-[220px] max-h-[340px] overflow-y-auto">
          {logs.map((log, idx) => {
            if (log.type === 'system') {
              return (
                <div key={idx} className="text-slate-500 italic">
                  # {log.text}
                </div>
              );
            }
            if (log.type === 'prompt') {
              return (
                <div key={idx} className="text-sky-300">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'input') {
              return (
                <div key={idx} className="text-amber-200 font-semibold">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'success') {
              return (
                <div key={idx} className="text-emerald-400 font-bold bg-emerald-950/30 p-2 rounded border border-emerald-800/40">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'error') {
              return (
                <div key={idx} className="text-rose-400 font-bold bg-rose-950/30 p-2 rounded border border-rose-800/40">
                  {log.text}
                </div>
              );
            }
            return (
              <div key={idx} className="text-slate-200">
                {log.text}
              </div>
            );
          })}
        </div>

        {/* Interactive Input Line */}
        <form
          onSubmit={handleSubmit}
          className="border-t border-slate-800/80 bg-slate-950/80 px-4 py-2.5 flex items-center gap-2"
        >
          <span className="text-emerald-400 font-bold select-none">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={
              step === 'idle'
                ? "Clique em Iniciar ou digite 'python calculadora.py' e tecle Enter..."
                : step === 'awaiting_num1'
                ? 'Digite o 1º número e tecle Enter...'
                : step === 'awaiting_op'
                ? 'Digite a operação (+, -, *, /) e tecle Enter...'
                : step === 'awaiting_num2'
                ? 'Digite o 2º número e tecle Enter...'
                : 'Pressione Enter para reiniciar...'
            }
            className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder:text-slate-600"
          />
          <button
            type="submit"
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Enviar input"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
