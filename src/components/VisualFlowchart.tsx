/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GitBranch, ArrowDown, HelpCircle, Check, AlertTriangle } from 'lucide-react';

interface FlowNode {
  id: string;
  title: string;
  subtitle: string;
  type: 'start' | 'io' | 'decision' | 'process' | 'error' | 'end';
  pythonLine: string;
  explanation: string;
}

const FLOW_NODES: FlowNode[] = [
  {
    id: 'start',
    title: '1. Início do Programa',
    subtitle: 'O interpretador Python começa lendo a primeira linha do arquivo.',
    type: 'start',
    pythonLine: '# Início da execução',
    explanation: 'Ao digitar "python calculadora.py", o Python aloca memória e prepara a execução do script.',
  },
  {
    id: 'menu',
    title: '2. Exibição do Menu (print)',
    subtitle: 'Comunica ao usuário quais símbolos são aceitos.',
    type: 'io',
    pythonLine: 'print("Operações: +, -, *, /")',
    explanation: 'Sempre forneça instruções claras para o usuário saber o que o programa espera receber.',
  },
  {
    id: 'inputs',
    title: '3. Entrada de Dados (input & float)',
    subtitle: 'Lê num1, a operação e num2 do teclado.',
    type: 'io',
    pythonLine: 'num1 = float(input(...))\noperacao = input(...)\nnum2 = float(input(...))',
    explanation: 'A função input() recebe o texto do teclado e float() converte a string para número com vírgula/ponto flutuante.',
  },
  {
    id: 'branch',
    title: '4. Decisão Condicional (if / elif / else)',
    subtitle: 'Verifica o valor da variável "operacao" contra +, -, *, /.',
    type: 'decision',
    pythonLine: 'if operacao == "+": ...\nelif operacao == "-": ...',
    explanation: 'O computador só entra no bloco de código cuja condição for Verdadeira (True). Todas as outras são ignoradas.',
  },
  {
    id: 'zero_check',
    title: '5. Proteção de Divisão por Zero',
    subtitle: 'Regra matemática: se a operação for "/" e num2 for 0, bloqueia!',
    type: 'error',
    pythonLine: 'if num2 != 0: ... else: print("Erro!")',
    explanation: 'Essa checagem é fundamental para evitar que o Python lance um ZeroDivisionError e interrompa o programa.',
  },
  {
    id: 'output',
    title: '6. Exibição do Resultado (f-string)',
    subtitle: 'Imprime a resposta calculada de forma elegante.',
    type: 'io',
    pythonLine: 'print(f"Resultado: {resultado}")',
    explanation: 'As f-strings permitem interpolar variáveis diretamente dentro da mensagem de forma limpa e legível.',
  },
  {
    id: 'end',
    title: '7. Fim do Programa',
    subtitle: 'Todas as instruções foram concluídas com sucesso.',
    type: 'end',
    pythonLine: '# Fim do script',
    explanation: 'O programa libera a memória e devolve o controle ao terminal do sistema operacional.',
  },
];

export const VisualFlowchart: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<FlowNode>(FLOW_NODES[2]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold text-white">Fluxograma Lógico Interativo</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Clique nos blocos para entender o fluxo de execução e a tomada de decisão do computador.
          </p>
        </div>
      </div>

      {/* Main Container: Flowchart Steps + Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Step Flow List */}
        <div className="lg:col-span-7 flex flex-col items-center space-y-2">
          {FLOW_NODES.map((node, index) => {
            const isSelected = selectedNode.id === node.id;

            let badgeColor = 'bg-slate-800 text-slate-300 border-slate-700';
            if (node.type === 'start' || node.type === 'end') {
              badgeColor = 'bg-blue-950/60 text-blue-300 border-blue-700/60';
            } else if (node.type === 'decision') {
              badgeColor = 'bg-purple-950/60 text-purple-300 border-purple-700/60';
            } else if (node.type === 'error') {
              badgeColor = 'bg-amber-950/60 text-amber-300 border-amber-700/60';
            } else if (node.type === 'io') {
              badgeColor = 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60';
            }

            return (
              <React.Fragment key={node.id}>
                <button
                  onClick={() => setSelectedNode(node)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/20 bg-slate-800/90'
                      : 'hover:bg-slate-800/60 bg-slate-950/60'
                  } ${badgeColor}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{node.title}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-900/80">
                      {node.type === 'decision'
                        ? 'Decisão'
                        : node.type === 'error'
                        ? 'Validação'
                        : node.type === 'io'
                        ? 'Entrada / Saída'
                        : 'Controle'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{node.subtitle}</p>
                </button>

                {/* Arrow down between nodes */}
                {index < FLOW_NODES.length - 1 && (
                  <div className="text-slate-600 flex justify-center py-0.5">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Selected Step Detail Inspector */}
        <div className="lg:col-span-5 sticky top-4 bg-slate-950/90 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <HelpCircle className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Detalhes do Bloco Selecionado
            </h3>
          </div>

          <div>
            <h4 className="text-base font-bold text-white mb-1">{selectedNode.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedNode.explanation}</p>
          </div>

          {/* Python Code Example */}
          <div>
            <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Código Python Equivalente:
            </span>
            <pre className="bg-[#0b0f19] p-3 rounded-lg border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre">
              {selectedNode.pythonLine}
            </pre>
          </div>

          {/* Quick learning takeaway */}
          <div className="bg-blue-950/40 border border-blue-800/50 rounded-lg p-3 text-xs text-blue-200 flex items-start gap-2">
            <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <strong>Para memorizar:</strong> Em programação, o fluxo segue rigorosamente uma ordem. Condições (if) são bifurcações que guiam o programa para caminhos diferentes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
