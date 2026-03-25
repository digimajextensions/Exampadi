'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardTitle } from '@/components/ui/card';
import { User, CreditCard, Bell, AlertTriangle } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'plan', label: 'Plan', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-text-primary">Settings</h1>
        <p className="text-text-secondary text-sm mt-1">Manage your account and preferences.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-green-50 text-green-600'
                : 'text-text-secondary hover:bg-bg-hover'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile tab */}
      {activeTab === 'profile' && (
        <Card>
          <CardTitle>Profile Information</CardTitle>
          <form className="mt-4 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Full Name" id="name" placeholder="Your full name" />
              <Input label="Email" id="email" type="email" disabled placeholder="your@email.com" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Phone" id="phone" type="tel" placeholder="080XXXXXXXX" />
              <Input label="School" id="school" disabled placeholder="Your school" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Department" id="department" disabled placeholder="Your department" />
              <Input label="Level" id="level" disabled placeholder="Your level" />
            </div>
            <Button>Save Changes</Button>
          </form>
        </Card>
      )}

      {/* Plan tab */}
      {activeTab === 'plan' && (
        <Card>
          <CardTitle>Current Plan</CardTitle>
          <div className="mt-4 space-y-4">
            <div className="bg-bg-surface rounded-xl p-4">
              <div className="font-display font-bold text-lg text-text-primary">Free Plan</div>
              <p className="text-sm text-text-secondary mt-1">5 AI questions per day. Upgrade for more features.</p>
            </div>
            <Link href="/dashboard/settings/plan">
              <Button>Upgrade Plan</Button>
            </Link>
          </div>
        </Card>
      )}

      {/* Notifications tab */}
      {activeTab === 'notifications' && (
        <Card>
          <CardTitle>Notification Preferences</CardTitle>
          <div className="mt-4 space-y-4">
            {[
              { label: 'Email study reminders', description: 'Daily email with your focus topic' },
              { label: 'SMS study reminders', description: 'Daily SMS reminder (Scholar+ plans)' },
              { label: 'Streak at risk alerts', description: 'Notification when your streak is about to break' },
              { label: 'Weekly progress report', description: 'Weekly email summary of your progress' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-medium text-text-primary">{item.label}</div>
                  <div className="text-xs text-text-muted">{item.description}</div>
                </div>
                <input type="checkbox" className="rounded border-border text-green-500 focus:ring-green-500" />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Danger zone */}
      {activeTab === 'danger' && (
        <Card className="border-red-200">
          <CardTitle className="text-red-500">Danger Zone</CardTitle>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-medium text-text-primary">Clear all materials</div>
                <div className="text-xs text-text-muted">Delete all uploaded study materials</div>
              </div>
              <Button variant="outline" size="sm" className="border-red-200 text-red-500 hover:bg-red-50">
                Clear
              </Button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-medium text-text-primary">Delete account</div>
                <div className="text-xs text-text-muted">Permanently delete your account and all data</div>
              </div>
              <Button variant="outline" size="sm" className="border-red-200 text-red-500 hover:bg-red-50">
                Delete
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
