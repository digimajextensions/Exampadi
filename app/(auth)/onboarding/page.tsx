'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const SCHOOLS = [
  { id: 'uniben', name: 'University of Benin', abbr: 'UNIBEN', type: 'University' },
  { id: 'unilag', name: 'University of Lagos', abbr: 'UNILAG', type: 'University' },
  { id: 'ui', name: 'University of Ibadan', abbr: 'UI', type: 'University' },
  { id: 'abu', name: 'Ahmadu Bello University', abbr: 'ABU', type: 'University' },
  { id: 'oau', name: 'Obafemi Awolowo University', abbr: 'OAU', type: 'University' },
  { id: 'unn', name: 'University of Nigeria Nsukka', abbr: 'UNN', type: 'University' },
  { id: 'futa', name: 'Federal University of Tech., Akure', abbr: 'FUTA', type: 'University' },
  { id: 'lasu', name: 'Lagos State University', abbr: 'LASU', type: 'University' },
  { id: 'yabatech', name: 'Yaba College of Technology', abbr: 'YABATECH', type: 'Polytechnic' },
  { id: 'fpi', name: 'Federal Polytechnic Ilaro', abbr: 'FPI', type: 'Polytechnic' },
  { id: 'mapoly', name: 'Moshood Abiola Polytechnic', abbr: 'MAPOLY', type: 'Polytechnic' },
  { id: 'fceirr', name: 'Federal College of Edu., Eha-Amufu', abbr: 'FCE Eha-Amufu', type: 'College of Education' },
  { id: 'fceokene', name: 'Federal College of Edu., Okene', abbr: 'FCE Okene', type: 'College of Education' },
];

const DEPARTMENTS: Record<string, string[]> = {
  University: ['Computer Science', 'Electrical Engineering', 'Medicine & Surgery', 'Law', 'Accounting', 'Business Admin', 'Mass Communication', 'Economics', 'Civil Engineering', 'Pharmacy', 'Nursing', 'Architecture', 'Physics', 'Mathematics', 'Chemistry', 'Biology', 'English & Literature', 'Political Science', 'Sociology', 'Psychology'],
  Polytechnic: ['Computer Science', 'Electrical/Electronics Engineering', 'Mechanical Engineering', 'Business Admin', 'Accountancy', 'Mass Communication', 'Civil Engineering Technology', 'Food Technology', 'Science Laboratory Technology'],
  'College of Education': ['Computer Science Education', 'Mathematics Education', 'English Education', 'Physics Education', 'Chemistry Education', 'Biology Education', 'Social Studies Education', 'Business Education', 'Primary Education Studies'],
};

const LEVELS = ['100 Level', '200 Level', '300 Level', '400 Level', '500 Level', 'HND 1', 'HND 2', 'NCE 1', 'NCE 2', 'NCE 3'];

const GOALS = [
  { id: 'pass', label: 'Just pass & move on', icon: '✅' },
  { id: 'credit', label: 'Get a solid 2:1 / Upper Credit', icon: '🎯' },
  { id: 'first', label: 'First Class / Distinction', icon: '🏆' },
  { id: 'resit', label: 'Clear a carryover / resit', icon: '💪' },
];

const STUDY_HOURS = ['1 hour/day', '2 hours/day', '3 hours/day', '4+ hours/day'];

const STEPS = ['Welcome', 'School', 'Department', 'Level & Goal', 'Exam Date', 'Ready!'];

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    school: '',
    schoolType: '',
    department: '',
    level: '',
    goal: '',
    studyHours: '',
    examDate: '',
    phone: '',
  });
  const [saving, setSaving] = useState(false);

  const canProceed = () => {
    switch (step) {
      case 0: return true;
      case 1: return !!data.school;
      case 2: return !!data.department;
      case 3: return !!data.level && !!data.goal;
      case 4: return !!data.examDate;
      case 5: return true;
      default: return false;
    }
  };

  const handleFinish = async () => {
    setSaving(true);
    try {
      await fetch('/api/student/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          school: data.school,
          schoolType: data.schoolType,
          department: data.department,
          level: data.level,
          goal: data.goal,
          studyHours: data.studyHours,
          examDate: data.examDate,
          phone: data.phone,
        }),
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Onboarding error:', error);
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        {/* Progress bar */}
        <div className="flex gap-1.5 mb-8">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={cn(
                'flex-1 h-1 rounded-full transition-colors',
                i <= step ? 'bg-green-500' : 'bg-border'
              )}
            />
          ))}
        </div>

        {/* Step 0: Welcome */}
        {step === 0 && (
          <div className="text-center">
            <div className="text-4xl mb-4">📚</div>
            <h1 className="font-display font-extrabold text-2xl text-text-primary mb-2">
              Welcome to ExamPadi{user?.firstName ? `, ${user.firstName}` : ''}!
            </h1>
            <p className="text-text-secondary mb-6">
              Let&apos;s set up your profile so our AI tutor can personalise your study experience.
            </p>
          </div>
        )}

        {/* Step 1: School */}
        {step === 1 && (
          <div>
            <h2 className="font-display font-bold text-xl text-text-primary mb-2">What school are you in?</h2>
            <p className="text-sm text-text-secondary mb-6">Select your institution</p>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {SCHOOLS.map((school) => (
                <button
                  key={school.id}
                  onClick={() => setData({ ...data, school: school.name, schoolType: school.type })}
                  className={cn(
                    'w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center gap-3',
                    data.school === school.name
                      ? 'border-green-500 bg-green-50'
                      : 'border-border hover:bg-bg-hover'
                  )}
                >
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold font-display flex-shrink-0',
                    data.school === school.name ? 'bg-green-500 text-white' : 'bg-bg-surface text-text-secondary'
                  )}>
                    {school.abbr.slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{school.name}</div>
                    <div className="text-xs text-text-muted">{school.type} &middot; {school.abbr}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Department */}
        {step === 2 && (
          <div>
            <h2 className="font-display font-bold text-xl text-text-primary mb-2">Your department?</h2>
            <p className="text-sm text-text-secondary mb-6">Select your course of study</p>
            <div className="flex flex-wrap gap-2">
              {(DEPARTMENTS[data.schoolType] || DEPARTMENTS.University).map((dept) => (
                <button
                  key={dept}
                  onClick={() => setData({ ...data, department: dept })}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm border transition-all',
                    data.department === dept
                      ? 'border-green-500 bg-green-50 text-green-600 font-semibold'
                      : 'border-border text-text-secondary hover:bg-bg-hover'
                  )}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Level & Goal */}
        {step === 3 && (
          <div>
            <h2 className="font-display font-bold text-xl text-text-primary mb-4">Level and study goal</h2>
            <div className="mb-6">
              <p className="text-sm font-medium text-text-primary mb-3">Current Level</p>
              <div className="flex flex-wrap gap-2">
                {LEVELS.map((level) => (
                  <button
                    key={level}
                    onClick={() => setData({ ...data, level })}
                    className={cn(
                      'px-4 py-2 rounded-full text-sm border transition-all',
                      data.level === level
                        ? 'border-green-500 bg-green-50 text-green-600 font-semibold'
                        : 'border-border text-text-secondary hover:bg-bg-hover'
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary mb-3">What&apos;s your goal?</p>
              <div className="space-y-2">
                {GOALS.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => setData({ ...data, goal: goal.id })}
                    className={cn(
                      'w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center gap-3',
                      data.goal === goal.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-border hover:bg-bg-hover'
                    )}
                  >
                    <span className="text-xl">{goal.icon}</span>
                    <span className="text-sm font-medium">{goal.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Exam Date */}
        {step === 4 && (
          <div>
            <h2 className="font-display font-bold text-xl text-text-primary mb-2">When is your exam?</h2>
            <p className="text-sm text-text-secondary mb-6">This helps us create the perfect study timetable for you</p>
            <Input
              type="date"
              label="Exam Start Date"
              id="examDate"
              value={data.examDate}
              onChange={(e) => setData({ ...data, examDate: e.target.value })}
            />
            <div className="mt-4">
              <p className="text-sm font-medium text-text-primary mb-3">How many hours can you study daily?</p>
              <div className="flex flex-wrap gap-2">
                {STUDY_HOURS.map((hours) => (
                  <button
                    key={hours}
                    onClick={() => setData({ ...data, studyHours: hours })}
                    className={cn(
                      'px-4 py-2 rounded-full text-sm border transition-all',
                      data.studyHours === hours
                        ? 'border-green-500 bg-green-50 text-green-600 font-semibold'
                        : 'border-border text-text-secondary hover:bg-bg-hover'
                    )}
                  >
                    {hours}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <Input
                label="Phone Number (for SMS reminders)"
                id="phone"
                type="tel"
                placeholder="080XXXXXXXX"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Step 5: Ready */}
        {step === 5 && (
          <div className="text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="font-display font-extrabold text-2xl text-text-primary mb-2">You&apos;re all set!</h2>
            <p className="text-text-secondary mb-6">
              Your personalised study experience is ready. Let&apos;s get to work.
            </p>
            <div className="bg-bg-surface rounded-xl p-4 text-left text-sm space-y-2 mb-6">
              <div><span className="text-text-muted">School:</span> <span className="font-medium">{data.school}</span></div>
              <div><span className="text-text-muted">Department:</span> <span className="font-medium">{data.department}</span></div>
              <div><span className="text-text-muted">Level:</span> <span className="font-medium">{data.level}</span></div>
              <div><span className="text-text-muted">Exam Date:</span> <span className="font-medium">{data.examDate}</span></div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
              Back
            </Button>
          )}
          {step < 5 ? (
            <Button onClick={() => setStep(step + 1)} disabled={!canProceed()} className="flex-1">
              {step === 0 ? 'Let\'s Go' : 'Continue'}
            </Button>
          ) : (
            <Button onClick={handleFinish} disabled={saving} className="flex-1">
              {saving ? 'Setting up...' : 'Start Studying'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
