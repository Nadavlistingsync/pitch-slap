export interface FeedbackRule {
  rule: string;
}

export interface VCPrompt {
  vc: string;
  system: string;
  user: string;
  feedback_rules: FeedbackRule[];
}

export interface VCPromptResponse {
  prompt: string;
  feedback: string[];
  score: number;
} 