'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';

type LeaderboardScope = 'school' | 'department' | 'national';

const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Chioma A.', school: 'UNIBEN', xp: 12500, streak: 45 },
  { rank: 2, name: 'Tunde O.', school: 'UNILAG', xp: 11200, streak: 38 },
  { rank: 3, name: 'Aisha M.', school: 'ABU', xp: 10800, streak: 33 },
  { rank: 4, name: 'Emeka N.', school: 'UNN', xp: 9500, streak: 28 },
  { rank: 5, name: 'Fatima B.', school: 'OAU', xp: 8900, streak: 25 },
];

export default function LeaderboardPage() {
  const [scope, setScope] = useState<LeaderboardScope>('school');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-text-primary">Leaderboard</h1>
        <p className="text-text-secondary text-sm mt-1">See how you rank among fellow students.</p>
      </div>

      {/* Scope tabs */}
      <div className="flex gap-2">
        {(['school', 'department', 'national'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setScope(s)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors',
              scope === s ? 'bg-green-50 text-green-600 border border-green-200' : 'text-text-secondary hover:bg-bg-hover'
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-4 py-8">
        {MOCK_LEADERBOARD.slice(0, 3).map((entry, i) => {
          const heights = ['h-32', 'h-24', 'h-20'];
          const order = [1, 0, 2];
          const e = MOCK_LEADERBOARD[order[i]];
          return (
            <div key={e.rank} className="text-center">
              <div className={cn(
                'w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center font-display font-bold',
                e.rank === 1 ? 'bg-gold-50 text-gold-500 text-lg' : 'bg-bg-surface text-text-secondary'
              )}>
                {e.name.charAt(0)}
              </div>
              <div className="font-semibold text-sm">{e.name}</div>
              <div className="text-xs text-text-muted">{e.xp.toLocaleString()} XP</div>
              <div className={cn('mt-2 w-20 rounded-t-lg mx-auto', heights[i],
                e.rank === 1 ? 'bg-gold-500' : e.rank === 2 ? 'bg-gray-300' : 'bg-amber-600'
              )} />
            </div>
          );
        })}
      </div>

      {/* Full rankings */}
      <Card>
        <div className="space-y-0">
          {MOCK_LEADERBOARD.map((entry) => (
            <div key={entry.rank} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
              <span className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                entry.rank <= 3 ? 'bg-gold-50 text-gold-500' : 'bg-bg-surface text-text-muted'
              )}>
                {entry.rank}
              </span>
              <div className="flex-1">
                <div className="font-medium text-sm text-text-primary">{entry.name}</div>
                <div className="text-xs text-text-muted">{entry.school}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm text-text-primary">{entry.xp.toLocaleString()} XP</div>
                <div className="text-xs text-text-muted">{entry.streak} day streak</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
