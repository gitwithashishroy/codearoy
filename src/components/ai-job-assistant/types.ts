export type ActionType = 'ask-referral' | 'hr-message' | 'cold-message' | 'cold-email';

export interface AIModelOption {
  id: string;
  label: string;
  isDefault?: boolean;
}
