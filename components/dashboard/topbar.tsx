'use client';

import { UserButton } from '@clerk/nextjs';
import { Flame, Zap } from 'lucide-react';

interface TopbarProps {
  streak?: number;
  xp?: number;
}

export function Topbar({ streak = 0, xp = 0 }: TopbarProps) {
  return (
    <div className="h-[60px] bg-white border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-sm">
          <Flame className="h-4 w-4 text-orange-500" />
          <span className="font-semibold text-text-primary">{streak}</span>
          <span className="text-text-muted">streak</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          <Zap className="h-4 w-4 text-gold-500" />
          <span className="font-semibold text-text-primary">{xp.toLocaleString()}</span>
          <span className="text-text-muted">XP</span>
        </div>
      </div>

      <UserButton
        appearance={{
          elements: {
            avatarBox: 'w-8 h-8',
          },
        }}
      />
    </div>
  );
}
