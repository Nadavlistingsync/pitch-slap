import { realVCPersonalities } from '../../types/realVCPersonalities';

export interface VCPrompt {
  id: string;
  name: string;
  prompt: string;
  model: string;
}

export const vcPrompts: readonly VCPrompt[] = realVCPersonalities.map(vc => ({
  id: vc.id,
  name: vc.name,
  prompt: vc.prompt,
  model: 'gpt-4'
})); 