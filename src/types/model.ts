export type ColumnStatus = 'idle' | 'typing' | 'streaming' | 'complete' | 'error';

export type Column = {
  model: string;
  status: ColumnStatus;
  text: string;
  error?: string;
  startedAt?: number;
  finishedAt?: number;
  costUsd?: number;
};
export interface ModelDef {
  provider: 'openai' | 'openrouter';
  model: string;
}

export const MODELS: ModelDef[] = [
  // { provider: 'openai', model: 'gpt-4o-mini' },
  { provider: 'openai', model: 'gpt-4.1-nano' },
  { provider: 'openrouter', model: 'x-ai/grok-4-fast:free' },
  { provider: 'openrouter', model: 'google/gemma-2-9b-it:free' },
];
