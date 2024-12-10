"use client"; // Usado para permitir o uso de hooks

import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Simulação de validação de login
    if (cpf === "12345678900" && senha === "senha123") {
      // Sucesso, redireciona para a página de pagamentos
      router.push("/pagamentos");
    } else {
      // Senha incorreta
      alert("CPF ou senha incorretos!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-600 to-blue-900 text-white p-8">
      <h1 className="text-5xl font-bold text-center text-orange-300 mb-6">AgilFan - Login</h1>
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
        <div className="mb-4">
          <label htmlFor="cpf" className="block text-sm font-semibold">CPF</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="Digite seu CPF"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="senha" className="block text-sm font-semibold">Senha</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="Digite sua senha"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-yellow-500 text-black rounded shadow hover:bg-yellow-600 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
