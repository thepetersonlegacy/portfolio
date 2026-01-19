import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

// Pill component - Light theme version with blue accent
export function Pill({
  children,
  className,
  variant = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'success';
}) {
  const variants = {
    default: 'border-gray-200 bg-gray-50 text-gray-700',
    primary: 'border-primary-200 bg-primary-50 text-primary-700',
    success: 'border-green-200 bg-green-50 text-green-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// Section Title component - Light theme with blue accent
export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  centered = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div className={cn('max-w-phi-md', centered && 'mx-auto text-center')}>
      {eyebrow && (
        <div className="mb-phi-md text-phi-xs font-medium uppercase tracking-[0.22em] text-primary-600">
          {eyebrow}
        </div>
      )}
      <h2 className="text-balance text-fluid-lg md:text-fluid-xl font-semibold tracking-tight text-gray-900 mb-phi-lg">
        {title}
      </h2>
      {subtitle && (
        <p className="text-balance text-phi-sm md:text-phi-base leading-relaxed text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// Premium Card component - Light theme with glassmorphism
export function Card({
  children,
  className,
  hover = false,
  gradient = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'rounded-2xl border border-gray-200 bg-white shadow-sm backdrop-blur-sm',
        gradient && 'bg-gradient-to-br from-white to-gray-50',
        hover && 'transition-all duration-300',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

// Bento Card - Specialized card for bento grid layouts
export function BentoCard({
  children,
  className,
  size = 'default',
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'default' | 'large';
}) {
  const sizes = {
    small: 'md:col-span-2',
    default: 'md:col-span-3',
    large: 'md:col-span-4',
  };

  return (
    <Card
      hover
      className={cn(
        'p-phi-2xl h-full',
        sizes[size],
        className
      )}
    >
      {children}
    </Card>
  );
}

// Feature Badge - For highlighting key features
export function FeatureBadge({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary-200 bg-primary-50 text-primary-600">
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold text-gray-900">{title}</div>
        <div className="mt-1 text-sm text-gray-600">{description}</div>
      </div>
    </div>
  );
}

// Stat Card - For displaying metrics
export function StatCard({
  value,
  label,
  icon,
  trend,
}: {
  value: string;
  label: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down';
}) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-3xl font-bold text-gray-900">{value}</div>
          <div className="mt-1 text-sm text-gray-600">{label}</div>
        </div>
        {icon && (
          <div className="rounded-lg bg-primary-50 p-2 text-primary-600">
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className={cn(
          'mt-2 text-xs font-medium',
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        )}>
          {trend === 'up' ? '↑' : '↓'} Trending {trend}
        </div>
      )}
    </Card>
  );
}

