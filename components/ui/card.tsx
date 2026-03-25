import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered';
}

export function Card({ className, variant = 'default', children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl p-6',
        {
          'bg-white border border-border shadow-sm': variant === 'default',
          'bg-white shadow-lg': variant === 'elevated',
          'bg-white border-2 border-border': variant === 'bordered',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('font-display text-lg font-bold text-text-primary', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm text-text-secondary', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
}
