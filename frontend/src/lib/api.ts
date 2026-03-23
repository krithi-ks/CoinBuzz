import { Coin, Alert, MetricsOverview, ForensicsData, SimulationRequest, SimulationResult, CopilotResponse, JudgeView, Narrative } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function fetchAPI<T>(path: string, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options?.headers },
    });
    if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
    return res.json();
  } catch {
    throw new Error(`Failed to fetch ${path}`);
  }
}

export const api = {
  health: () => fetchAPI<{status: string}>('/health'),
  coins: {
    list: () => fetchAPI<{coins: Coin[]; total: number}>('/coins'),
    get: (id: string) => fetchAPI<Coin>(`/coins/${id}`),
  },
  metrics: {
    overview: () => fetchAPI<MetricsOverview>('/metrics/overview'),
  },
  trends: () => fetchAPI<{top_trends: Coin[]; trending_up: Coin[]; pre_pump: Coin[]}>('/trends'),
  alerts: (severity?: string) => fetchAPI<{alerts: Alert[]}>(`/alerts${severity ? `?severity=${severity}` : ''}`),
  watchlist: {
    get: () => fetchAPI<{watchlist: Coin[]}>('/watchlist'),
    add: (id: string) => fetchAPI(`/watchlist/${id}`, {method: 'POST'}),
  },
  insights: () => fetchAPI<{daily_briefing: string; top_opportunity: string; top_risk: string}>('/insights'),
  forensics: (coin: string) => fetchAPI<ForensicsData>(`/forensics/${coin}`),
  simulation: {
    run: (req: SimulationRequest) => fetchAPI<SimulationResult>('/simulation/run', {
      method: 'POST',
      body: JSON.stringify(req),
    }),
  },
  copilot: {
    query: (prompt: string, mode = 'trader', coin_context?: string) =>
      fetchAPI<CopilotResponse>('/copilot/query', {
        method: 'POST',
        body: JSON.stringify({ prompt, mode, coin_context }),
      }),
    briefing: () => fetchAPI('/copilot/briefing'),
  },
  narratives: () => fetchAPI<{narratives: Narrative[]}>('/narratives'),
  platformShift: () => fetchAPI('/platform-shift'),
  predictions: () => fetchAPI('/predictions'),
  judgeView: () => fetchAPI<JudgeView>('/judge-view'),
};
