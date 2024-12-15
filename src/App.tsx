import React from 'react';
import { ChatBot } from './components/ChatBot/ChatBot';
import { Heart, Users, Clock, Building2 } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <header className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-2 animate-slide-in">SARA</h1>
            <p className="text-xl text-blue-100 mb-4 animate-slide-in" style={{animationDelay: '0.1s'}}>
              Sistema de Acolhimento e Recepção e Atendimento
            </p>
            <p className="text-blue-100 animate-slide-in" style={{animationDelay: '0.2s'}}>
              Encontre a unidade de saúde mais próxima de você com facilidade e rapidez
            </p>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <section className="mb-12 animate-slide-in" style={{animationDelay: '0.3s'}}>
            <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">
              Por que escolher o SARA?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Heart className="w-8 h-8 text-blue-600" />,
                  title: "Atendimento Humanizado",
                  description: "Cuidado personalizado para suas necessidades"
                },
                {
                  icon: <Users className="w-8 h-8 text-blue-600" />,
                  title: "Fácil Acesso",
                  description: "Encontre unidades próximas rapidamente"
                },
                {
                  icon: <Clock className="w-8 h-8 text-blue-600" />,
                  title: "Tempo Real",
                  description: "Informações atualizadas sobre tempo de espera"
                },
                {
                  icon: <Building2 className="w-8 h-8 text-blue-600" />,
                  title: "Rede Completa",
                  description: "Acesso a toda rede de unidades SUS"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                  style={{animationDelay: `${0.4 + index * 0.1}s`}}
                >
                  <div className="mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-lg animate-slide-in glass-effect" style={{animationDelay: '0.8s'}}>
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Como funciona?</h3>
            <div className="space-y-4">
              {[
                "Clique no botão de chat no canto inferior direito",
                "Compartilhe sua localização ou digite seu endereço",
                "Receba recomendações personalizadas de unidades próximas",
                "Veja informações detalhadas e tempos de espera em tempo real"
              ].map((step, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-blue-50"
                >
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <div className="flex justify-center items-center gap-4 mt-12">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Entrar com CPF"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors">
            Entrar
          </button>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Entrar com Cartão SUS"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors">
            Entrar
          </button>
        </div>
      </div>

      <ChatBot />
    </div>
  );
}

export default App;