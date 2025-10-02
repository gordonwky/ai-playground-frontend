'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Column, MODELS } from '@/types/model';
import { StatusBadge } from './StatusBadge';
import { Metrics } from '@/components/Metrics';

export default function Playground() {
    const [prompt, setPrompt] = useState('');
    const [cols, setCols] = useState<Record<string, Column>>({});
    const [loading, setLoading] = useState(false);

    async function runRealStream() {
        setCols({});
        setLoading(true);

        console.log('Here:', prompt);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('api/sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
                body: JSON.stringify({
                    userId: localStorage.getItem('userId'),
                    prompt,
                    models: MODELS.map((m) => ({
                        provider: m.provider,
                        model: m.model,
                    })),
                }),
            });


            const data = await res.json();
            const sessionId = data.sessionId;

            const es = new EventSource(`/api/sessions/${sessionId}/stream`);

            es.onmessage = (e) => {
                const ev = JSON.parse(e.data).data;
                if (ev.type === "all-complete") {
                    es.close();
                    setLoading(false);
                    return;
                }

                setCols((prev) => {
                    const prevCol = prev[ev.model] || { model: ev.model, status: 'idle', text: '' };

                    if (ev.type === 'delta') {
                        return {
                            ...prev,
                            [ev.model]: {
                                ...prevCol,
                                text: (prevCol.text || '') + ev.delta,
                                status: 'streaming',
                                startedAt: prevCol.startedAt ?? Date.now(),
                            },
                        };
                    } else if (ev.type === 'end') {
                        return {
                            ...prev,
                            [ev.model]: {
                                ...prevCol,
                                status: 'complete',
                                finishedAt: Date.now(),
                                costUsd: ev.costUsd,
                            },
                        };
                    } else if (ev.type === 'error') {
                        return {
                            ...prev,
                            [ev.model]: {
                                ...prevCol,
                                status: 'error',
                                error: ev.message,
                            },
                        };
                    }
                    return prev;
                });
            };

            es.onerror = (err) => {
                console.error(" SSE error", err);
                es.close();
                setLoading(false);
            };




        } catch (err) {
            console.error('runRealStream error', err);
            setLoading(false);
        }
    }

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold">Demo</h1>

            {/* Prompt input */}
            <div className="flex gap-3">
                <textarea
                    className="flex-1 border rounded-xl p-3"
                    rows={3}
                    placeholder="Enter your prompt..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                    onClick={runRealStream}
                    disabled={loading}
                    className="px-4 py-2 rounded-xl bg-black text-white self-start disabled:opacity-50"
                >
                    {loading ? 'Running…' : 'Run'}
                </button>
            </div>

            {/* Model columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MODELS.map(({ model }) => {
                    const c = cols[model];
                    return (
                        <div key={model} className="bg-white rounded-2xl shadow p-4 border flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                                <div className="font-mono text-sm">
                                    {model}
                                </div>
                                <StatusBadge status={c?.status || 'idle'} />
                            </div>

                            <div className="prose prose-sm max-w-none flex-1 overflow-y-auto">
                                {c?.text ? (
                                    <ReactMarkdown>{c.text}</ReactMarkdown>
                                ) : (
                                    <div className="text-gray-400">waiting…</div>
                                )}
                            </div>
                            {c && <Metrics col={c} />}
                            {c?.error && <div className="text-red-600 text-sm mt-2">{c.error}</div>}
                        </div>
                    );
                })}

            </div>
        </div>
    );
}
