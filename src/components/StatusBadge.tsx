import clsx from 'clsx';
import { Column } from '../types/model';
export function StatusBadge({ status }: { status: Column['status'] }) {
    return (
        <span
            className={clsx(
                'px-2 py-0.5 rounded-full text-xs border',
                status === 'streaming' && 'bg-blue-50 text-blue-700 border-blue-200',
                status === 'complete' && 'bg-emerald-50 text-emerald-700 border-emerald-200',
                status === 'error' && 'bg-red-50 text-red-700 border-red-200',
                (status === 'idle' || status === 'typing') &&
                'bg-gray-50 text-gray-600 border-gray-200'
            )}
        >
            {status}
        </span>
    );
}