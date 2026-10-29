/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, Check, Download, Info, Sparkles } from 'lucide-react';
import { PYTHON_VERSIONS } from '../data/pythonSnippets';

interface CodeViewerProps {
  selectedVersionId: string;
  onSelectVersion: (id: string) => void;
  highlightedLine?: number | null;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  selectedVersionId,
  onSelectVersion,
  highlightedLine,
}) => {
  const [copied, setCopied] = useState(false);
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  const currentVersion =
    PYTHON_VERSIONS.find((v) => v.id === selectedVersionId) || PYTHON_VERSIONS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentVersion.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentVersion.code], { type: 'text/x-python;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentVersion.id === 'basic' ? 'calculadora_simples' : currentVersion.id === 'functions' ? 'calculadora_modular' : 'calculadora_robusta'}.py`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Helper to color Python code
  const formatCodeLine = (line: string) => {
    if (line.trim().startsWith('#')) {
      return <span className="text-emerald-400 font-medium italic">{line}</span>;
    }

    // Split comments at the end of the line
    const hashIndex = line.indexOf(' #');
    let codePart = line;
    let commentPart = '';
    if (hashIndex !== -1 && !line.slice(0, hashIndex).includes('"') && !line.slice(0, hashIndex).includes("'")) {
      codePart = line.slice(0, hashIndex);
      commentPart = line.slice(hashIndex);
    }

    // Tokenize strings, keywords, builtins, operators
    const tokens: React.ReactNode[] = [];
    const regex = /(f?".*?"|'.*?'|\b(?:if|elif|else|def|return|while|try|except|break|continue|in|True|False|not|and|or)\b|\b(?:print|input|float|int|str|len|range)\b|[+\-*/=<>!]+|\b\d+(?:\.\d+)?\b|[a-zA-Z_]\w*|[^\w\s])/g;

    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(codePart)) !== null) {
      if (match.index > lastIdx) {
        tokens.push(codePart.substring(lastIdx, match.index));
      }

      const token = match[0];
      if (token.startsWith('"') || token.startsWith("'") || token.startsWith('f"') || token.startsWith("f'")) {
        tokens.push(
          <span key={match.index} className="text-amber-300">
            {token}
          </span>
        );
      } else if (
        /^(if|elif|else|def|return|while|try|except|break|continue|in|True|False|not|and|or)$/.test(token)
      ) {
        tokens.push(
          <span key={match.index} className="text-purple-400 font-semibold">
            {token}
          </span>
        );
      } else if (/^(print|input|float|int|str|len|range)$/.test(token)) {
        tokens.push(
          <span key={match.index} className="text-sky-400 font-semibold">
            {token}
          </span>
        );
      } else if (/^[+\-*/=<>!]+$/.test(token)) {
        tokens.push(
          <span key={match.index} className="text-pink-400 font-bold">
            {token}
          </span>
        );
      } else if (/^\d+(\.\d+)?$/.test(token)) {
        tokens.push(
          <span key={match.index} className="text-orange-300">
            {token}
          </span>
        );
      } else {
        tokens.push(<span key={match.index} className="text-slate-100">{token}</span>);
      }

      lastIdx = regex.lastIndex;
    }

    if (lastIdx < codePart.length) {
      tokens.push(codePart.substring(lastIdx));
    }

    return (
      <>
        {tokens}
        {commentPart && (
          <span className="text-emerald-400/90 italic font-medium">{commentPart}</span>
        )}
      </>
    );
  };

  const lines = currentVersion.code.split('\n');
  const activeExplanation =
    (hoveredLine && currentVersion.lineExplanations[hoveredLine]) ||
    (highlightedLine && currentVersion.lineExplanations[highlightedLine]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col">
      {/* Version Tabs Header */}
      <div className="bg-slate-950/80 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {PYTHON_VERSIONS.map((v) => {
            const isSelected = v.id === selectedVersionId;
            return (
              <button
                key={v.id}
                onClick={() => onSelectVersion(v.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{v.title.split(':')[0]}</span>
                {v.id === 'basic' && (
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded-full border border-emerald-500/30">
                    Básico
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors border border-slate-700 cursor-pointer"
            title="Copiar código Python"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-blue-200 text-xs font-medium transition-colors border border-blue-500/30 cursor-pointer"
            title="Baixar arquivo .py para o seu computador"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>

      {/* Description banner */}
      <div className="bg-slate-900/60 px-5 py-2.5 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
        <p className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{currentVersion.description}</span>
        </p>
        <span className="text-[11px] text-slate-500 hidden sm:inline">
          Dica: passe o mouse sobre as linhas com ℹ️ para ver a explicação
        </span>
      </div>

      {/* Interactive Tooltip Bar if a line is hovered or active */}
      {activeExplanation && (
        <div className="bg-blue-950/70 border-b border-blue-800/60 px-5 py-2.5 flex items-start gap-2.5 text-xs text-blue-200 animate-fadeIn">
          <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
          <div>
            <span className="font-semibold text-blue-300 mr-1.5">
              Linha {hoveredLine || highlightedLine}:
            </span>
            <span>{activeExplanation}</span>
          </div>
        </div>
      )}

      {/* Code Editor Body */}
      <div className="relative font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto max-h-[580px] p-4 bg-[#0d1117] selection:bg-blue-900 selection:text-white">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, index) => {
              const lineNum = index + 1;
              const isHighlighted = highlightedLine === lineNum;
              const isHovered = hoveredLine === lineNum;
              const hasExplanation = Boolean(currentVersion.lineExplanations[lineNum]);

              return (
                <tr
                  key={lineNum}
                  onMouseEnter={() => setHoveredLine(lineNum)}
                  onMouseLeave={() => setHoveredLine(null)}
                  className={`group transition-colors ${
                    isHighlighted
                      ? 'bg-amber-500/20 ring-1 ring-amber-400/50'
                      : isHovered
                      ? 'bg-slate-800/50'
                      : ''
                  }`}
                >
                  {/* Line Number Column */}
                  <td className="w-12 select-none pr-4 text-right align-top py-0.5 text-slate-600 group-hover:text-slate-400">
                    <span className="inline-flex items-center gap-1 justify-end w-full">
                      {hasExplanation && (
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-blue-400/70"
                          title="Linha explicada"
                        />
                      )}
                      <span>{lineNum}</span>
                    </span>
                  </td>

                  {/* Code Line Content */}
                  <td className="align-top py-0.5 whitespace-pre font-mono text-slate-200">
                    {formatCodeLine(line)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <span>Python 3.x • UTF-8</span>
        <span>{lines.length} linhas de código</span>
      </div>
    </div>
  );
};
