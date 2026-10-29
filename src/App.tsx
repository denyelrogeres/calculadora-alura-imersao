/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Code2,
  Terminal as TerminalIcon,
  GitBranch,
  BookOpen,
  HelpCircle,
  Laptop,
  Calculator,
  Download,
  Share2,
  Check,
  CheckCircle,
} from 'lucide-react';
import { CodeViewer } from './components/CodeViewer';
import { StepDebugger } from './components/StepDebugger';
import { TerminalSimulator } from './components/TerminalSimulator';
import { VisualFlowchart } from './components/VisualFlowchart';
import { ConceptExplainer } from './components/ConceptExplainer';
import { QuizSection } from './components/QuizSection';
import { HowToRunGuide } from './components/HowToRunGuide';
import { PYTHON_VERSIONS } from './data/pythonSnippets';

type NavTab = 'code' | 'debugger' | 'terminal' | 'flowchart' | 'concepts' | 'quiz' | 'guide';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('code');
  const [selectedVersionId, setSelectedVersionId] = useState<string>('basic');
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleDownloadPy = () => {
    const cur = PYTHON_VERSIONS.find((v) => v.id === selectedVersionId) || PYTHON_VERSIONS[0];
    const blob = new Blob([cur.code], { type: 'text/x-python;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calculadora.py';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & App Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-amber-400 p-0.5 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Calculator className="w-5 h-5 text-amber-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Calculadora em Python
                </h1>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300">
                  Para Iniciantes
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                As 4 operações básicas, fluxo lógico e código comentado
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              title="Baixar arquivo calculadora.py"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Baixar</span> .py
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
              title="Copiar link do app"
            >
              {copiedShare ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/60 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-1.5 py-2" aria-label="Navegação de Módulos">
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Código Python</span>
            </button>

            <button
              onClick={() => setActiveTab('debugger')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'debugger'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Simulador Passo a Passo</span>
            </button>

            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'terminal'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>Terminal Interativo</span>
            </button>

            <button
              onClick={() => setActiveTab('flowchart')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'flowchart'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Fluxograma Lógico</span>
            </button>

            <button
              onClick={() => setActiveTab('concepts')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'concepts'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Conceitos Teóricos</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Quiz de Fixação</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'guide'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Como Rodar no PC</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col gap-6 w-full">
        {/* Quick Intro Banner */}
        <section className="bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
              Construa sua Primeira Calculadora em Python
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Aprenda de forma descomplicada como o Python recebe dados com <code className="text-sky-300">input()</code>,
              converte valores com <code className="text-sky-300">float()</code>, toma decisões com <code className="text-purple-300">if / elif / else</code>,
              e evita o clássico erro de divisão por zero!
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs">
              <span className="font-mono text-emerald-400 font-bold">+</span>
              <span className="text-slate-300">Adição</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs">
              <span className="font-mono text-emerald-400 font-bold">-</span>
              <span className="text-slate-300">Subtração</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs">
              <span className="font-mono text-emerald-400 font-bold">*</span>
              <span className="text-slate-300">Multiplicação</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs">
              <span className="font-mono text-emerald-400 font-bold">/</span>
              <span className="text-slate-300">Divisão</span>
            </div>
          </div>
        </section>

        {/* Tab-driven views */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <CodeViewer
              selectedVersionId={selectedVersionId}
              onSelectVersion={setSelectedVersionId}
              highlightedLine={highlightedLine}
            />

            {/* Quick Link to try in terminal or debugger */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                onClick={() => setActiveTab('debugger')}
                className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-4 rounded-xl cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-white text-sm">Quer ver o código rodando passo a passo?</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Abra o Simulador para ver as variáveis na memória do computador.
                  </p>
                </div>
                <span className="text-xs font-semibold text-blue-400 bg-blue-950/60 border border-blue-800/60 px-3 py-1.5 rounded-lg">
                  Abrir Simulador →
                </span>
              </div>

              <div
                onClick={() => setActiveTab('terminal')}
                className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-4 rounded-xl cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-white text-sm">Quer digitar no terminal interativo?</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Faça cálculos livres como se estivesse no VS Code ou Linux.
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-lg">
                  Abrir Terminal →
                </span>
              </div>
            </div>

            {/* Embedded Concept Explainer summary */}
            <ConceptExplainer />
          </div>
        )}

        {activeTab === 'debugger' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6 space-y-6">
              <StepDebugger onHighlightLine={setHighlightedLine} />
            </div>
            <div className="lg:col-span-6">
              <CodeViewer
                selectedVersionId="basic"
                onSelectVersion={setSelectedVersionId}
                highlightedLine={highlightedLine}
              />
            </div>
          </div>
        )}

        {activeTab === 'terminal' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <TerminalSimulator />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Como interagir com o Terminal
                </h3>
                <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      Clique em <strong>"Iniciar Programa"</strong> ou digite <code className="bg-slate-800 px-1 py-0.5 rounded text-sky-300">python calculadora.py</code>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      Digite o primeiro número (ex: <strong>25</strong>) e aperte <strong>Enter</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      Digite o símbolo da operação: <strong>+</strong>, <strong>-</strong>, <strong>*</strong> ou <strong>/</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      Digite o segundo número (tente <strong>0</strong> com a divisão para testar o tratamento de erro!).
                    </span>
                  </li>
                </ul>
              </div>

              <VisualFlowchart />
            </div>
          </div>
        )}

        {activeTab === 'flowchart' && (
          <div className="space-y-6">
            <VisualFlowchart />
          </div>
        )}

        {activeTab === 'concepts' && (
          <div className="space-y-6">
            <ConceptExplainer />
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <QuizSection />
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="space-y-6">
            <HowToRunGuide />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>Guia Didático de Python • As 4 Operações Básicas</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('code')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Código
            </button>
            <button
              onClick={() => setActiveTab('debugger')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Simulador
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terminal
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Instalação
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
