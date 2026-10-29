/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BookOpen,
  Box,
  Keyboard,
  GitFork,
  AlignLeft,
  ShieldAlert,
  Sparkles,
  Lightbulb,
} from 'lucide-react';
import { CONCEPTS, ConceptItem } from '../data/pythonSnippets';

const iconMap: Record<string, React.ReactNode> = {
  Box: <Box className="w-5 h-5 text-sky-400" />,
  Keyboard: <Keyboard className="w-5 h-5 text-amber-400" />,
  GitFork: <GitFork className="w-5 h-5 text-purple-400" />,
  AlignLeft: <AlignLeft className="w-5 h-5 text-emerald-400" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-rose-400" />,
  Sparkles: <Sparkles className="w-5 h-5 text-indigo-400" />,
};

export const ConceptExplainer: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState<ConceptItem>(CONCEPTS[0]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white">Guia Teórico dos Componentes em Python</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Os 6 pilares essenciais do Python explicados de forma simples e direta para iniciantes.
          </p>
        </div>
      </div>

      {/* Concept Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {CONCEPTS.map((concept) => {
          const isSelected = concept.id === selectedConcept.id;
          return (
            <button
              key={concept.id}
              onClick={() => setSelectedConcept(concept)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-2 ${
                isSelected
                  ? 'bg-blue-950/70 border-blue-500 ring-2 ring-blue-500/30'
                  : 'bg-slate-950/50 border-slate-800 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between">
                {iconMap[concept.iconName] || <BookOpen className="w-5 h-5 text-slate-400" />}
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                )}
              </div>
              <div>
                <span className="text-xs font-bold text-white block leading-tight">
                  {concept.title}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5 line-clamp-1">
                  {concept.pythonSyntax}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Concept Deep Dive View */}
      <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl p-5 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            {iconMap[selectedConcept.iconName]}
            <div>
              <h3 className="text-base font-bold text-white">{selectedConcept.title}</h3>
              <p className="text-xs text-slate-400">{selectedConcept.summary}</p>
            </div>
          </div>
          <code className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-sky-300">
            {selectedConcept.pythonSyntax}
          </code>
        </div>

        {/* Explanation paragraph */}
        <div className="text-sm text-slate-200 leading-relaxed bg-slate-900/50 p-4 rounded-lg border border-slate-800/80">
          {selectedConcept.explanation}
        </div>

        {/* Code Snippet */}
        <div>
          <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Exemplo Prático em Python:
          </span>
          <pre className="bg-[#0b0f19] p-3.5 rounded-lg border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300 overflow-x-auto">
            {selectedConcept.codeSnippet}
          </pre>
        </div>

        {/* Beginner Tip Alert */}
        <div className="bg-amber-950/40 border border-amber-800/50 rounded-lg p-3.5 text-xs text-amber-200 flex items-start gap-2.5">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300 font-semibold block mb-0.5">Dica para Iniciantes:</strong>
            {selectedConcept.beginnerTip}
          </div>
        </div>
      </div>
    </div>
  );
};
