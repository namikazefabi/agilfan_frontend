"use client";

import React, { useState } from "react";

export default function Pagamentos() {
  const [pagamentos, setPagamentos] = useState([
    {
      id_pagamento: "PGT001",
      matricula: "2022001",
      tipo: 1,
      mes_ref: 12,
      ano_ref: 2024,
      dt_venc: "2024-12-20",
      valor: 500.0,
      valor_a_pagar: 450.0,
      valor_pago: 0.0,
      situacao: "pendente", // Situations: "pendente", "pago", "cancelado"
      id_turma: "TURMA01",
    },
    {
      id_pagamento: "PGT002",
      matricula: "2022002",
      tipo: 1,
      mes_ref: 11,
      ano_ref: 2024,
      dt_venc: "2024-11-20",
      valor: 500.0,
      valor_a_pagar: 450.0,
      valor_pago: 450.0,
      situacao: "pago",
      id_turma: "TURMA02",
    },
  ]);

  // Formatar valores para Real (R$)
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // Formatar datas para o formato brasileiro
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("pt-BR");

  // Atualizar o valor pago
  const handleValorPagoChange = (id: string, newValue: number) => {
    setPagamentos((prev) =>
      prev.map((p) => {
        if (p.id_pagamento === id) {
          const isPago = newValue === p.valor_a_pagar; // Verifica se o valor pago é igual ao valor a pagar
          return {
            ...p,
            valor_pago: newValue,
            situacao: isPago ? "pago" : "pendente", // Atualiza a situação
          };
        }
        return p;
      })
    );
  };

  // Alterar situação para "cancelado" e gerar novo boleto
  const handleCancel = (id: string) => {
    setPagamentos((prev) =>
      prev.map((p) => {
        if (p.id_pagamento === id) {
          return {
            ...p,
            situacao: "cancelado",
            id_pagamento: `NEW-${Math.random().toString(36).substr(2, 9)}`, // Gerar novo ID
            valor_pago: 0, // Resetar valor pago
            valor_a_pagar: p.valor, // Novo boleto com valor cheio
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-blue-600 to-blue-900 text-white">
      <header className="mb-8">
        <h1 className="text-5xl font-bold text-center text-orange-500">AgilFan</h1>
        <p className="text-center mt-2 text-lg">
          Seu sistema para gerenciar pagamentos com eficiência
        </p>
      </header>
      <div className="flex flex-col items-center">
        <table className="w-full max-w-5xl bg-white text-black rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-4 text-left">📑 ID Pagamento</th>
              <th className="p-4 text-left">👤 Matrícula</th>
              <th className="p-4 text-left">📅 Mês/Ano</th>
              <th className="p-4 text-left">⏰ Vencimento</th>
              <th className="p-4 text-right">💲 Valor (R$)</th>
              <th className="p-4 text-right">💲 Valor a Pagar (R$)</th>
              <th className="p-4 text-right">💵 Valor Pago (R$)</th>
              <th className="p-4 text-center">✔️ Situação</th>
              <th className="p-4 text-center">✅ Ações</th>
            </tr>
          </thead>
          <tbody>
            {pagamentos.map((p) => (
              <tr key={p.id_pagamento} className="border-t hover:bg-gray-100">
                <td className="p-4">{p.id_pagamento}</td>
                <td className="p-4">{p.matricula}</td>
                <td className="p-4">{`${p.mes_ref}/${p.ano_ref}`}</td>
                <td className="p-4">{formatDate(p.dt_venc)}</td>
                <td className="p-4 text-right">{formatCurrency(p.valor)}</td>
                <td className="p-4 text-right">{formatCurrency(p.valor_a_pagar)}</td>
                <td className="p-4 text-right">
                  <input
                    type="number"
                    value={p.valor_pago}
                    onChange={(e) =>
                      handleValorPagoChange(
                        p.id_pagamento,
                        parseFloat(e.target.value)
                      )
                    }
                    className="w-20 text-right border rounded p-1"
                  />
                </td>
                <td
                  className={`p-4 text-center font-semibold ${
                    p.situacao === "pago"
                      ? "text-green-500"
                      : p.situacao === "pendente"
                      ? "text-orange-500"
                      : "text-red-500"
                  }`}
                >
                  {p.situacao.charAt(0).toUpperCase() + p.situacao.slice(1)}
                </td>
                <td className="p-4 text-center flex justify-center gap-2">
                  {p.situacao !== "cancelado" && (
                    <button
                      onClick={() => handleCancel(p.id_pagamento)}
                      className="px-2 py-1 bg-red-500 text-white rounded shadow hover:bg-red-600"
                    >
                      Cancelar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
