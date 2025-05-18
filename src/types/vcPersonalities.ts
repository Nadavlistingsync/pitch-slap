export interface VCPersonality {
  id: string;
  name: string;
  description: string;
  characteristics: string[];
  typicalQuestions: string[];
  investmentStyle: string;
  riskTolerance: 'Low' | 'Medium' | 'High';
  focusAreas: string[];
}

export const vcPersonalities: VCPersonality[] = [
  {
    id: 'visionary',
    name: 'The Visionary',
    description: 'A forward-thinking investor who focuses on breakthrough technologies and market-disrupting ideas.',
    characteristics: [
      'Emphasizes long-term vision',
      'Values innovation and disruption',
      'Looks for moonshot opportunities',
      'Strong focus on market potential'
    ],
    typicalQuestions: [
      'How will this change the world in 10 years?',
      'What\'s your vision for the future of this industry?',
      'How will you maintain your first-mover advantage?'
    ],
    investmentStyle: 'Long-term, high-conviction bets on transformative technologies',
    riskTolerance: 'High',
    focusAreas: ['Deep Tech', 'AI/ML', 'Biotech', 'Space Tech']
  },
  {
    id: 'operator',
    name: 'The Operator',
    description: 'A hands-on investor with strong operational experience who focuses on execution and metrics.',
    characteristics: [
      'Data-driven decision making',
      'Focus on unit economics',
      'Strong operational background',
      'Emphasis on execution'
    ],
    typicalQuestions: [
      'What are your unit economics?',
      'How will you scale operations?',
      'What\'s your customer acquisition cost?',
      'How will you maintain margins at scale?'
    ],
    investmentStyle: 'Growth-stage investments with proven business models',
    riskTolerance: 'Medium',
    focusAreas: ['SaaS', 'Marketplaces', 'E-commerce', 'B2B']
  },
  {
    id: 'networker',
    name: 'The Networker',
    description: 'A well-connected investor who leverages their network to help portfolio companies grow.',
    characteristics: [
      'Extensive industry connections',
      'Focus on team and relationships',
      'Strong emphasis on networking',
      'Value-add investor'
    ],
    typicalQuestions: [
      'Who are your key advisors?',
      'How will you build your team?',
      'What strategic partnerships are you pursuing?',
      'How will you leverage our network?'
    ],
    investmentStyle: 'Early-stage investments with strong team focus',
    riskTolerance: 'Medium',
    focusAreas: ['Consumer', 'Enterprise', 'Fintech', 'Healthtech']
  },
  {
    id: 'conservative',
    name: 'The Conservative',
    description: 'A risk-averse investor who focuses on proven business models and clear paths to profitability.',
    characteristics: [
      'Focus on profitability',
      'Conservative growth approach',
      'Strong emphasis on market validation',
      'Risk-averse decision making'
    ],
    typicalQuestions: [
      'When will you be profitable?',
      'What\'s your burn rate?',
      'How will you manage cash flow?',
      'What\'s your path to break-even?'
    ],
    investmentStyle: 'Later-stage investments with proven business models',
    riskTolerance: 'Low',
    focusAreas: ['Enterprise SaaS', 'Fintech', 'Healthcare', 'Real Estate']
  }
]; 