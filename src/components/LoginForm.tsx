import React, { useState } from 'react';

export function LoginForm() {
  const [loginType, setLoginType] = useState<'cpf' | 'sus'>('cpf');
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar lógica de login
    console.log('Login com:', loginType, inputValue);
  };

  const formatInput = (value: string) => {
    if (loginType === 'cpf') {
      // Formato: 000.000.000-00
      return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
    } else {
      // Formato: 000 0000 0000 0000
      return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/(\d{4})(\d)/, '$1 $2')
        .replace(/( \d{4})\d+?$/, '$1');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInput(e.target.value);
    setInputValue(formatted);
  };

  const maxLength = loginType === 'cpf' ? 14 : 19; // 000.000.000-00 ou 000 0000 0000 0000

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => {
            setLoginType('cpf');
            setInputValue('');
          }}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
            loginType === 'cpf'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Entrar com CPF
        </button>
        <button
          onClick={() => {
            setLoginType('sus');
            setInputValue('');
          }}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
            loginType === 'sus'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Entrar com Cartão SUS
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            maxLength={maxLength}
            placeholder={loginType === 'cpf' ? '000.000.000-00' : '000 0000 0000 0000'}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
