/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/pythonSnippets';

export const QuizSection: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
  };

  const totalAnswered = Object.keys(userAnswers).length;
  const isComplete = totalAnswered === QUIZ_QUESTIONS.length;
  const score = calculateScore();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Quiz de Fixação para Iniciantes</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Teste o que você acabou de aprender sobre a calculadora e a lógica do Python!
          </p>
        </div>

        <div className="flex items-center gap-2">
          {showResults && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Refazer Quiz</span>
            </button>
          )}

          {!showResults && (
            <button
              onClick={() => setShowResults(true)}
              disabled={!isComplete}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                isComplete
                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-600/20 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
              }`}
            >
              <span>Verificar Respostas ({totalAnswered}/{QUIZ_QUESTIONS.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Result Score Banner */}
      {showResults && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
            score === QUIZ_QUESTIONS.length
              ? 'bg-emerald-950/50 border-emerald-800/70 text-emerald-200'
              : 'bg-blue-950/50 border-blue-800/70 text-blue-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <h3 className="font-bold text-white text-base">
                Você acertou {score} de {QUIZ_QUESTIONS.length} perguntas!
              </h3>
              <p className="text-xs text-slate-300">
                {score === QUIZ_QUESTIONS.length
                  ? 'Incrível! Você já domina a lógica essencial para criar programas em Python.'
                  : 'Muito bom! Dê uma olhada nas explicações abaixo para fixar os pontos restantes.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {QUIZ_QUESTIONS.map((q, qIndex) => {
          const selectedOption = userAnswers[q.id];
          const hasAnswered = selectedOption !== undefined;
          const isCorrect = selectedOption === q.correctIndex;

          return (
            <div
              key={q.id}
              className="bg-slate-950/70 border border-slate-800/90 rounded-xl p-4 flex flex-col gap-3"
            >
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {qIndex + 1}
                </span>
                <p className="font-medium text-slate-200 text-sm">{q.question}</p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selectedOption === optIdx;
                  const isThisCorrect = optIdx === q.correctIndex;

                  let btnStyle = 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300';
                  if (showResults) {
                    if (isThisCorrect) {
                      btnStyle = 'bg-emerald-950/60 border-emerald-600 text-emerald-200 font-medium';
                    } else if (isThisSelected && !isThisCorrect) {
                      btnStyle = 'bg-rose-950/60 border-rose-600 text-rose-200';
                    } else {
                      btnStyle = 'bg-slate-900/50 border-slate-800/50 text-slate-500 opacity-60';
                    }
                  } else if (isThisSelected) {
                    btnStyle = 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={showResults}
                      className={`text-left text-xs p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-2 ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {showResults && isThisCorrect && (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {showResults && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation note when results are shown */}
              {showResults && (
                <div
                  className={`mt-1 text-xs p-3 rounded-lg border leading-relaxed ${
                    isCorrect
                      ? 'bg-emerald-950/30 text-emerald-300 border-emerald-900/40'
                      : 'bg-amber-950/30 text-amber-300 border-amber-900/40'
                  }`}
                >
                  <strong>Explicação:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
