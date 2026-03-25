'use client';

import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MessageCircle, Upload, Calendar, BookOpen, Flame, Zap, BarChart3, Trophy } from 'lucide-react';

const QUICK_ACTIONS = [
  { href: '/dashboard/chat', icon: MessageCircle, label: 'Chat with AI Tutor', color: 'bg-green-50 text-green-500' },
  { href: '/dashboard/upload', icon: Upload, label: 'Upload Materials', color: 'bg-blue-50 text-blue-500' },
  { href: '/dashboard/timetable', icon: Calendar, label: 'View Timetable', color: 'bg-purple-50 text-purple-500' },
  { href: '/dashboard/leaderboard', icon: Trophy, label: 'Leaderboard', color: 'bg-gold-50 text-gold-500' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div>
        <h1 className="font-display font-extrabold text-2xl text-text-primary">Welcome back!</h1>
        <p className="text-text-secondary text-sm mt-1">Here is your study overview for today.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <Flame className="h-6 w-6 text-orange-500 mx-auto mb-2" />
          <div className="font-display font-bold text-2xl text-text-primary">0</div>
          <div className="text-xs text-text-muted">Day Streak</div>
        </Card>
        <Card className="text-center">
          <Zap className="h-6 w-6 text-gold-500 mx-auto mb-2" />
          <div className="font-display font-bold text-2xl text-text-primary">0</div>
          <div className="text-xs text-text-muted">Total XP</div>
        </Card>
        <Card className="text-center">
          <BarChart3 className="h-6 w-6 text-green-500 mx-auto mb-2" />
          <div className="font-display font-bold text-2xl text-text-primary">--</div>
          <div className="text-xs text-text-muted">Avg. Score</div>
        </Card>
        <Card className="text-center">
          <BookOpen className="h-6 w-6 text-blue-500 mx-auto mb-2" />
          <div className="font-display font-bold text-2xl text-text-primary">0</div>
          <div className="text-xs text-text-muted">Questions Today</div>
        </Card>
      </div>

      {/* Today's focus */}
      <Card>
        <CardTitle>Today&apos;s Focus</CardTitle>
        <p className="text-sm text-text-secondary mt-2">
          Upload your course materials and exam past questions to get started. Your AI tutor will create a personalised study plan based on your weak areas.
        </p>
        <div className="mt-4">
          <Link href="/dashboard/upload">
            <Button size="sm">Upload Materials</Button>
          </Link>
        </div>
      </Card>

      {/* Quick actions */}
      <div>
        <h2 className="font-display font-bold text-lg text-text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {QUICK_ACTIONS.map((action) => (
            <Link key={action.href} href={action.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer text-center py-6">
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mx-auto mb-3`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-text-primary">{action.label}</span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
