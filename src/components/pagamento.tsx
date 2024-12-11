"use client";

import React, { useState, useEffect } from "react";

export default function Pagamentos() {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);

  useEffect(() => {
    const createInitialData = async () => {
      const turmaData = {
        id_turma: "TURMA01",
        curso: "Curso Exemplo",
        turno: "Manhã",
        ano_ref: 2024,
        semestre_ref: 1,
        valor_face: 1000.0,
      };

      // Simular a criação da turma no banco de dados (exemplo)
      // await api.post('/turma', turmaData);

      const userData = {
        matricula: "2022001",
        user: "usuario1",
        password: "senha123",
        perfil: "aluno",
        nome: "Nome Exemplo",
        endereco: "Endereço Exemplo",
        telefone: "123456789",
        e_mail: "email@exemplo.com",
        cpf: "123.456.789-00",
        pc_desconto: 50.0,
      };

      // Simular a criação do usuário no banco de dados (exemplo)
      // await api.post('/user', userData);

      const pagamentosData = [
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
          valor: 500.0 // adicionando a propriedade 'valor'
        },
        {
          id_pagamento: "PGT002",
          matricula: "2022002",
          tipo: 1,
          mes_ref: 11,
          ano_ref: 2024,
          dt_venc: "2024-11-20",
          valor_a_pagar: 450.0,
          valor_pago: 450.0,
          situacao: "pago",
          id_turma: "TURMA02",
          valor: 500.0 // adicionando a propriedade 'valor'
        },
        {
          id_pagamento: "PGT03",
          matricula: "2022002",
          tipo: 1,
          mes_ref: 11,
          ano_ref: 2024,
          dt_venc: "2024-11-20",
          valor_a_pagar: 450.0,
          valor_pago: 450.0,
          situacao: "pago",
          id_turma: "TURMA02",
          valor: 500.0 // adicionando a propriedade 'valor'
        },
      ];

      // Simular a criação dos pagamentos no banco de dados (exemplo)
      // await api.post('/pagamento', pagamentosData);

      setPagamentos(pagamentosData);
    };

    createInitialData();
  }, []);

  // Formatar valores para Real (R$)
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // Formatar datas para o formato brasileiro
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("pt-BR");

  // Atualizar o valor pago
  const handleValorPagoChange = (id: string, newValue: number) => {
    setPagamentos((prev) =>
      prev.map((p) =>
        p.id_pagamento === id ? { ...p, valor_pago: newValue } : p
      )
    );
  };

  // Alterar situação para "pago" apenas se o valor for suficiente
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

  // Alterar situação para "cancelado"
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

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-blue-600 to-blue-900 text-white">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-bold text-center text-orange-500">AgilFan</h1>
          <p className="text-center mt-2 text-lg">
            Seu sistema para gerenciar pagamentos com eficiência
          </p>
        </div>
        <div>
          <p className="text-lg text-white">Bem-vindo, Usuário1</p>
          <p className="text-sm text-white">Curso: Curso Exemplo</p>
        </div>
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
                </
