import { HealthUnit } from '../components/ChatBot/types';

export const mockHealthUnits: HealthUnit[] = [
  {
    id: '1',
    name: 'UPA 24h Vila Nova',
    type: 'UPA',
    address: 'Av. Principal, 123 - Vila Nova',
    coordinates: {
      lat: -23.550520,
      lng: -46.633308
    },
    phone: '(11) 3333-1111',
    waitTime: 45,
    occupancyRate: 75,
    maxUrgencyLevel: 'alta',
    specialties: [
      { name: 'Clínica Geral', availableNow: true },
      { name: 'Pediatria', availableNow: true },
      { name: 'Ortopedia', availableNow: false, nextAvailableTime: '14:00' }
    ],
    services: [
      'Raio-X',
      'Exames laboratoriais',
      'Eletrocardiograma',
      'Inalação',
      'Medicação'
    ],
    openingHours: '24 horas',
    currentCapacity: {
      total: 50,
      available: 12
    }
  },
  {
    id: '2',
    name: 'Hospital Municipal Central',
    type: 'Hospital',
    address: 'Rua das Flores, 456 - Centro',
    coordinates: {
      lat: -23.557820,
      lng: -46.639447
    },
    phone: '(11) 3333-2222',
    waitTime: 90,
    occupancyRate: 85,
    maxUrgencyLevel: 'emergência',
    specialties: [
      { name: 'Clínica Geral', availableNow: true },
      { name: 'Pediatria', availableNow: true },
      { name: 'Ortopedia', availableNow: true },
      { name: 'Cardiologia', availableNow: false, nextAvailableTime: '15:30' },
      { name: 'Neurologia', availableNow: true }
    ],
    services: [
      'Centro cirúrgico',
      'UTI',
      'Raio-X',
      'Tomografia',
      'Ressonância',
      'Laboratório 24h'
    ],
    openingHours: '24 horas',
    currentCapacity: {
      total: 120,
      available: 15
    }
  },
  {
    id: '3',
    name: 'UBS Jardim Esperança',
    type: 'UBS',
    address: 'Rua das Margaridas, 789 - Jardim Esperança',
    coordinates: {
      lat: -23.543821,
      lng: -46.642611
    },
    phone: '(11) 3333-3333',
    waitTime: 20,
    occupancyRate: 45,
    maxUrgencyLevel: 'baixa',
    specialties: [
      { name: 'Clínica Geral', availableNow: true },
      { name: 'Pediatria', availableNow: true },
      { name: 'Ginecologia', availableNow: false, nextAvailableTime: 'Amanhã 09:00' }
    ],
    services: [
      'Vacinação',
      'Coleta de exames',
      'Pré-natal',
      'Acompanhamento familiar',
      'Curativos'
    ],
    openingHours: 'Segunda a Sexta: 07:00 às 17:00',
    currentCapacity: {
      total: 30,
      available: 16
    }
  },
  {
    id: '4',
    name: 'AME Especialidades',
    type: 'AME',
    address: 'Av. Saúde, 1000 - Jardim América',
    coordinates: {
      lat: -23.548890,
      lng: -46.638500
    },
    phone: '(11) 3333-4444',
    waitTime: 60,
    occupancyRate: 65,
    maxUrgencyLevel: 'média',
    specialties: [
      { name: 'Cardiologia', availableNow: true },
      { name: 'Endocrinologia', availableNow: true },
      { name: 'Oftalmologia', availableNow: false, nextAvailableTime: '16:00' },
      { name: 'Dermatologia', availableNow: true }
    ],
    services: [
      'Exames especializados',
      'Pequenas cirurgias',
      'Consultas especializadas',
      'Exames de imagem'
    ],
    openingHours: 'Segunda a Sexta: 08:00 às 18:00',
    currentCapacity: {
      total: 80,
      available: 28
    }
  }
];