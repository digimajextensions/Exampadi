import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'green' | 'gold' | 'red' | 'outline';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        {
          'bg-bg-surface text-text-secondary': variant === 'default',
          'bg-green-50 text-green-600': variant === 'green',
          'bg-gold-50 text-gold-500': variant === 'gold',
          'bg-red-50 text-red-600': variant === 'red',
          'border border-border text-text-secondary': variant === 'outline',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
