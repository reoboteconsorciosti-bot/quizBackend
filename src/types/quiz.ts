export type PerfilQuiz = 'acelerador' | 'estrategico' | 'conservador' | 'visionario' | 'patrimonial';

export interface QuizPayload {
  nome: string;
  telefone: string;
  perfil?: PerfilQuiz;
  perfil_nome?: string;
  consultor: string;
  tag: string;
}

export interface BotConversaPayload {
  phone: string;
  first_name: string;
  last_name?: string;
  fields: {
    perfil_quiz?: PerfilQuiz;
    perfil_nome?: string;
    consultor_selecionado: string;
  };
  tags: string[];
}
