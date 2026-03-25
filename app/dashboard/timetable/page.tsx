'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Calendar, RefreshCw, Loader2 } from 'lucide-react';

interface TimetableSlot {
  day: string;
  time: string;
  topic: string;
  duration: string;
  type: 'study' | 'review' | 'break' | 'quiz';
}

export default function TimetablePage() {
  const [timetable, setTimetable] = useState<TimetableSlot[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/timetable/generate', { method: 'POST' });
      if (response.ok) {
        const data = await response.json();
        setTimetable(data.slots || []);
      }
    } catch (error) {
      console.error('Timetable generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-text-primary">Study Timetable</h1>
          <p className="text-text-secondary text-sm mt-1">Your AI-generated weekly study plan.</p>
        </div>
        <Button onClick={handleGenerate} disabled={isGenerating}>
          {isGenerating ? (
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating...</>
          ) : (
            <><RefreshCw className="h-4 w-4 mr-2" /> Generate Timetable</>
          )}
        </Button>
      </div>

      {timetable.length === 0 ? (
        <Card className="text-center py-16">
          <Calendar className="h-12 w-12 text-text-muted mx-auto mb-4" />
          <h2 className="font-display font-bold text-lg text-text-primary mb-2">No timetable yet</h2>
          <p className="text-sm text-text-secondary max-w-md mx-auto mb-6">
            Click &quot;Generate Timetable&quot; to create a personalised 7-day study plan based on your exam date, weak topics, and available hours.
          </p>
          <Button onClick={handleGenerate} disabled={isGenerating}>Generate My Timetable</Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {DAYS.map((day) => {
            const daySlots = timetable.filter((s) => s.day === day);
            if (daySlots.length === 0) return null;
            return (
              <Card key={day}>
                <CardTitle>{day}</CardTitle>
                <div className="mt-3 space-y-2">
                  {daySlots.map((slot, i) => (
                    <div key={i} className="flex items-center gap-4 py-2 border-b border-border last:border-0">
                      <span className="text-xs text-text-muted w-20">{slot.time}</span>
                      <span className="text-sm font-medium text-text-primary flex-1">{slot.topic}</span>
                      <span className="text-xs text-text-muted">{slot.duration}</span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
