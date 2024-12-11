// pages/login.tsx
"use client"; // Use esta diretiva para indicar que este é um componente de cliente

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation

const LoginPage = () => {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Validação simples de CPF
  const isValidCPF = (cpf: string) => /^\d{11}$/.test(cpf.replace(/\D/g, ""));

  const handleLogin = () => {
    if (!isValidCPF(cpf)) {
      setError("CPF inválido. Digite 11 dígitos numéricos.");
      return;
    }

    // Simulação de validação de login
    if (cpf === "12345678900" && senha === "senha123") {
      router.push("/pagamentos");
    } else {
      setError("CPF ou senha incorretos!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-600 to-blue-900 text-white p-8">
      <h1 className="text-5xl font-bold text-center text-orange-300 mb-6">
        AgilFan - Login
      </h1>
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
        <div className="mb-4">
          <label htmlFor="cpf" className="block text-sm font-semibold">
            CPF
          </label>
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
          <label htmlFor="senha" className="block text-sm font-semibold">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="Digite sua senha"
          />
        </div>
        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-yellow-500 text-black rounded shadow hover:bg-yellow-600 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
