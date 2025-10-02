import { Column } from '@/types/model';

export function Metrics({ col }: { col: Column }) {
    const latency =
        col.startedAt && col.finishedAt ? col.finishedAt - col.startedAt : null;
    const chars = col.text?.length || 0;
    const cost = chars * 0.0001;

    return (
        <div className="mt-3 text-xs text-gray-600 flex gap-4">
            <div>
                Chars: <span className="font-mono">{chars}</span>
            </div>
            <div>
                Latency:{' '}
                <span className="font-mono">
                    {latency !== null ? `${latency} ms` : '—'}
                </span>
            </div>
            <div>
                Cost:{' '}
                <span className="font-mono">
                    {cost !== undefined ? `$${cost.toFixed(4)}` : '—'}
                </span>
            </div>
        </div>
    );
}
