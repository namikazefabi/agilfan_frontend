"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/services/api";

export default function Pagamentos() {
  const [pagamentos, setPagamentos] = useState<
    Array<{
      id_pagamento: string;
      matricula: string;
      tipo: number;
      mes_ref: number;
      ano_ref: number;
      dt_venc: string;
      valor_a_pagar: number;
      valor_pago: number;
      situacao: string;
      id_turma: string;
      valor: number;
    }>
  >([
    {
      id_pagamento: "PGT001",
      matricula: "2022001",
      tipo: 1,
      mes_ref: 12,
      ano_ref: 2024,
      dt_venc: "2024-12-20",
      valor_a_pagar: 450.0,
      valor_pago: 0.0,
      situacao: "pendente",
      id_turma: "TURMA01",
      valor: 500.0,
    },
  ]);

  const [newMesRef, setNewMesRef] = useState<string>("");
  const [newAnoRef, setNewAnoRef] = useState<string>("");
  const [showAddPayment, setShowAddPayment] = useState<boolean>(false);

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("pt-BR");

  const handleValorPagoChange = (id: string, newValue: number) => {
    setPagamentos((prev) =>
      prev.map((p) =>
        p.id_pagamento === id ? { ...p, valor_pago: newValue } : p
      )
    );
  };

  const handleCheck = (id: string) => {
    setPagamentos((prev) =>
      prev.map((p) => {
        if (
          p.id_pagamento === id &&
          p.valor_pago === p.valor_a_pagar &&
          p.situacao === "pendente"
        ) {
          return { ...p, situacao: "pago" };
        }
        return p;
      })
    );
  };

  const handleCancel = (id: string) => {
    setPagamentos((prev) =>
      prev.map((p) => {
        if (p.id_pagamento === id) {
          return {
            ...p,
            situacao: "cancelado",
            valor_pago: 0,
          };
        }
        return p;
      })
    );
  };

  const handleAddPayment = () => {
    const mes = parseInt(newMesRef, 10);
    const ano = parseInt(newAnoRef, 10);

    if (
      isNaN(mes) ||
      isNaN(ano) ||
      mes < 1 ||
      mes > 12 ||
      newMesRef.length !== 2 ||
      newAnoRef.length !== 4
    ) {
      alert("Por favor, insira valores válidos para o mês (01-12) e ano (4 dígitos).")
      return;
    }

    const novoPagamento = {
      id_pagamento: `PGT00${pagamentos.length + 1}`,
      matricula: "2022001",
      tipo: 1,
      mes_ref: mes,
      ano_ref: ano,
      dt_venc: `${ano}-${String(mes).padStart(2, "0")}-20`,
      valor_a_pagar: 500.0,
      valor_pago: 0.0,
      situacao: "pendente",
      id_turma: "TURMA01",
      valor: 500.0,
    };

    setPagamentos([...pagamentos, novoPagamento]);
    setShowAddPayment(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-blue-600 to-blue-900 text-white">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-bold text-center text-orange-500">AgilFan</h1>
          <p className="text-center mt-2 text-lg">
            Seu sistema para gerenciar pagamentos com eficiência
          </p>
        </div>
      </header>

      <div className="flex flex-col items-center">
        <button
          onClick={() => setShowAddPayment(true)}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
        >
          Adicionar Pagamento
        </button>

        {showAddPayment && (
          <div className="bg-white p-4 rounded shadow-md text-black">
            <h2 className="text-xl font-bold mb-4">Adicionar Boleto</h2>
            <div className="mb-4">
              <label>Mês (01-12):</label>
              <input
                type="text"
                value={newMesRef}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewMesRef(e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label>Ano (4 dígitos):</label>
              <input
                type="text"
                value={newAnoRef}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewAnoRef(e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleAddPayment}
                className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
              >
                Confirmar
              </button>
              <button
                onClick={() => setShowAddPayment(false)}
                className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

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
                    disabled={p.situacao !== "pendente"}
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
                  {p.situacao === "pendente" && (
                    <button
                      onClick={() => handleCheck(p.id_pagamento)}
                      className="px-2 py-1 bg-green-500 text-white rounded shadow hover:bg-green-600"
                    >
                      Pagar
                    </button>
                  )}
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
