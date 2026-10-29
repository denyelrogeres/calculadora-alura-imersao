/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Laptop, Terminal, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';

export const HowToRunGuide: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Laptop className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Como Rodar no seu Computador</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Passo a passo simples para você executar seu arquivo Python de verdade na sua máquina.
          </p>
        </div>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1 */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500 text-blue-400 text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h3 className="font-bold text-white text-sm">Instalar o Python</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Acesse o site oficial <strong className="text-white">python.org</strong> e baixe a versão mais recente para o seu sistema operacional.
          </p>
          <div className="bg-amber-950/40 border border-amber-800/50 rounded-lg p-2.5 text-xs text-amber-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Dica no Windows:</strong> Marque a caixinha <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300">Add python.exe to PATH</code> durante a instalação!
            </span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-purple-600/30 border border-purple-500 text-purple-400 text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h3 className="font-bold text-white text-sm">Salvar o Arquivo</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Clique no botão <strong className="text-blue-400">"Baixar .py"</strong> aqui no app ou abra o Bloco de Notas / VS Code, cole o código e salve como:
          </p>
          <code className="bg-slate-900 border border-slate-700 text-emerald-400 p-2 rounded text-xs font-mono text-center">
            calculadora.py
          </code>
        </div>

        {/* Step 3 */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-600/30 border border-emerald-500 text-emerald-400 text-xs font-bold flex items-center justify-center">
              3
            </span>
            <h3 className="font-bold text-white text-sm">Executar no Terminal</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Abra o Prompt de Comando (cmd), PowerShell ou Terminal na pasta onde salvou o arquivo e digite:
          </p>
          <div className="bg-[#0b0f19] border border-slate-800 p-2.5 rounded font-mono text-xs text-sky-300 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-slate-500" />
            <span>python calculadora.py</span>
          </div>
        </div>
      </div>

      {/* Alternative: Online without installing */}
      <div className="bg-gradient-to-r from-slate-950 to-blue-950/40 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <h4 className="text-sm font-bold text-white">Quer testar agora sem instalar nada?</h4>
            <p className="text-xs text-slate-400">
              Você pode colar o código diretamente no Google Colab, Replit ou Python.org Shell online.
            </p>
          </div>
        </div>
        <a
          href="https://colab.research.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
        >
          <span>Abrir Google Colab</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
