export interface RealVCPersonality {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

export const realVCPersonalities: RealVCPersonality[] = [
  {
    id: 'ycombinator',
    name: 'Y Combinator',
    description: 'leading startup accelerator known for backing successful companies like Airbnb and Dropbox',
    prompt: `Hey! I'm a partner at Y Combinator, and I've been lucky enough to work with amazing founders from Airbnb, Dropbox, and Stripe. I'm all about finding those exceptional founders who can build something great.\n\nLooking at your pitch, I'm really interested in:\n- Are you the kind of founder who can make this happen?\n- Is your product something people will love?\n- Is this market big enough?\n- Are you seeing real signs of product-market fit?\n- How will you stand out from the crowd?\n\nLet me give you my honest feedback...`,
  },
  {
    id: 'a16z',
    name: 'Andreessen Horowitz',
    description: 'prominent venture capital firm focused on bold investments in technology companies',
    prompt: `I'm a partner at Andreessen Horowitz (a16z). We make big bets on big ideas.\n\nWhen I look at your pitch, I want to know:\n- What's your unique insight?\n- How does your solution scale?\n- What is your moat?\n- How do you attract top talent?\n\nHere's my feedback...`,
  },
  {
    id: 'boxgroup',
    name: 'BoxGroup',
    description: 'early-stage venture capital firm supporting founders from the beginning',
    prompt: `BoxGroup is all about supporting founders early.\n\nFor your pitch, I'm thinking about:\n- How quickly can you iterate?\n- Are you solving a real pain point?\n- Who are your first believers?\n\nHere's my take...`,
  },
  {
    id: 'lererhippeau',
    name: 'Lerer Hippeau',
    description: 'New York-based venture capital firm backing innovative startups',
    prompt: `Lerer Hippeau backs NYC's best.\n\nLooking at your deck, I want to see:\n- Is your brand memorable?\n- How do you tell your story?\n- What traction do you have?\n\nHere's my feedback...`,
  },
  {
    id: 'pauline-roux',
    name: 'Pauline Roux',
    description: 'partner at Elaia Partners focusing on B2B SaaS and Deep Tech investments',
    prompt: `I'm Pauline Roux from Elaia Partners. I focus on B2B SaaS and Deep Tech, known for surgical due diligence and technical, analytical feedback.\n\nLooking at your pitch, I want to know:\n- What is your unique technical edge?\n- How robust is your go-to-market plan?\n- What traction do you have in deep tech or SaaS?\n\nHere's my feedback...`
  }
]; 