import type { PlanTier } from './paystack';

export interface PlanLimits {
  aiQuestionsPerDay: number;
  materialUploads: number;
  smsReminders: boolean;
  emailReminders: boolean;
  leaderboard: 'none' | 'school' | 'school_dept' | 'school_dept_national';
  skillometer: 'none' | 'basic' | 'full' | 'full_weekly';
  flashcardsPerDay: number;
  quizzesPerDay: number;
  timetable: 'basic' | 'smart' | 'smart_8020';
  priorityAI: boolean;
  teachTheAI: boolean;
}

const PLAN_LIMITS: Record<PlanTier, PlanLimits> = {
  free: {
    aiQuestionsPerDay: 5,
    materialUploads: 0,
    smsReminders: false,
    emailReminders: false,
    leaderboard: 'none',
    skillometer: 'none',
    flashcardsPerDay: 0,
    quizzesPerDay: 0,
    timetable: 'basic',
    priorityAI: false,
    teachTheAI: false,
  },
  starter: {
    aiQuestionsPerDay: 40,
    materialUploads: 3,
    smsReminders: false,
    emailReminders: true,
    leaderboard: 'school',
    skillometer: 'basic',
    flashcardsPerDay: 10,
    quizzesPerDay: 5,
    timetable: 'basic',
    priorityAI: false,
    teachTheAI: false,
  },
  scholar: {
    aiQuestionsPerDay: 150,
    materialUploads: 15,
    smsReminders: true,
    emailReminders: true,
    leaderboard: 'school_dept',
    skillometer: 'full',
    flashcardsPerDay: 50,
    quizzesPerDay: 20,
    timetable: 'smart',
    priorityAI: false,
    teachTheAI: false,
  },
  scholar_pro: {
    aiQuestionsPerDay: 400,
    materialUploads: 40,
    smsReminders: true,
    emailReminders: true,
    leaderboard: 'school_dept_national',
    skillometer: 'full_weekly',
    flashcardsPerDay: 150,
    quizzesPerDay: 60,
    timetable: 'smart_8020',
    priorityAI: true,
    teachTheAI: true,
  },
};

export function getPlanLimits(plan: PlanTier): PlanLimits {
  return PLAN_LIMITS[plan] || PLAN_LIMITS.free;
}

export function canAccessFeature(
  plan: PlanTier,
  feature: keyof PlanLimits,
  hasLifetimeAccess: boolean = false
): boolean {
  if (hasLifetimeAccess) return true;
  const limits = getPlanLimits(plan);
  const value = limits[feature];
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value > 0;
  if (typeof value === 'string') return value !== 'none';
  return false;
}

export function isWithinLimit(
  plan: PlanTier,
  feature: 'aiQuestionsPerDay' | 'materialUploads' | 'flashcardsPerDay' | 'quizzesPerDay',
  currentCount: number,
  hasLifetimeAccess: boolean = false
): boolean {
  if (hasLifetimeAccess) {
    return currentCount < PLAN_LIMITS.scholar_pro[feature];
  }
  const limit = getPlanLimits(plan)[feature];
  return currentCount < limit;
}

export function getPlanPrice(plan: PlanTier): number {
  const prices: Record<PlanTier, number> = {
    free: 0,
    starter: 3500,
    scholar: 5500,
    scholar_pro: 8500,
  };
  return prices[plan] || 0;
}

export function getPlanName(plan: PlanTier): string {
  const names: Record<PlanTier, string> = {
    free: 'Free',
    starter: 'Starter',
    scholar: 'Scholar',
    scholar_pro: 'Scholar Pro',
  };
  return names[plan] || 'Free';
}
