import React from 'react';
import { ChatBot } from './components/ChatBot/ChatBot';
import { Heart, Users, Clock, Building2 } from 'lucide-react';
import { LoginForm } from './components/LoginForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Por que escolher o SARA?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Heart className="w-8 h-8 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Atendimento Humanizado</h2>
            <p className="text-gray-600">
              Cuidado personalizado para suas necessidades
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Users className="w-8 h-8 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Fácil Acesso</h2>
            <p className="text-gray-600">
              Encontre unidades próximas rapidamente
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Clock className="w-8 h-8 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Tempo Real</h2>
            <p className="text-gray-600">
              Informações atualizadas sobre tempo de espera
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Building2 className="w-8 h-8 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Rede Completa</h2>
            <p className="text-gray-600">
              Acesso a toda rede de unidades SUS
            </p>
          </div>
        </div>

        <LoginForm />
      </div>

      <ChatBot />
    </div>
  );
}

export default App;