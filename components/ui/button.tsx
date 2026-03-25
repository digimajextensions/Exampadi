import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 shadow-green': variant === 'primary',
            'bg-bg-surface text-text-primary hover:bg-bg-hover border border-border': variant === 'secondary',
            'border-2 border-green-500 text-green-500 hover:bg-green-50': variant === 'outline',
            'text-text-secondary hover:text-text-primary hover:bg-bg-hover': variant === 'ghost',
            'bg-gold-500 text-white hover:opacity-90': variant === 'gold',
          },
          {
            'text-sm px-3 py-1.5 h-8': size === 'sm',
            'text-sm px-5 py-2.5 h-10': size === 'md',
            'text-base px-7 py-3 h-12': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, type ButtonProps };
