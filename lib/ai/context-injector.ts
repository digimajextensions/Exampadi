import { insforge } from '../insforge';
import type { StudentContext } from './prompt-builder';

interface StudentProfile {
  id: string;
  clerk_id: string;
  full_name: string;
  email: string;
  school: string;
  school_type: string;
  department: string;
  level: string;
  exam_date: string;
  study_goal: string;
  daily_hours: string;
  plan: string;
  current_streak: number;
  total_xp: number;
  has_lifetime_access: boolean;
}

interface TopicScore {
  topic_name: string;
  score: number;
  attempts: number;
}

/**
 * Fetches the full student context needed for AI prompt building.
 */
export async function getStudentContext(clerkId: string): Promise<StudentContext | null> {
  try {
    // Fetch student profile
    const profiles = await insforge.db.query<StudentProfile>(
      'SELECT * FROM students WHERE clerk_id = $1',
      [clerkId]
    );

    if (profiles.length === 0) return null;
    const profile = profiles[0];

    // Fetch topic scores
    const topics = await insforge.db.query<TopicScore>(
      `SELECT st.topic_name, st.score, st.attempts
       FROM student_topics st
       WHERE st.student_id = $1
       ORDER BY st.score ASC`,
      [profile.id]
    );

    const weakTopics = topics.filter((t) => t.score < 50).map((t) => t.topic_name);
    const strongTopics = topics.filter((t) => t.score >= 80).map((t) => t.topic_name);

    const examDate = profile.exam_date ? new Date(profile.exam_date) : undefined;
    const daysToExam = examDate
      ? Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : undefined;

    return {
      name: profile.full_name || 'Student',
      school: profile.school || '',
      department: profile.department || '',
      level: profile.level || '',
      examDate: profile.exam_date,
      daysToExam,
      goal: profile.study_goal || '',
      weakTopics,
      strongTopics,
      currentStreak: profile.current_streak || 0,
      totalXP: profile.total_xp || 0,
      plan: profile.plan || 'free',
    };
  } catch (error) {
    console.error('Error fetching student context:', error);
    return null;
  }
}

/**
 * Fetches relevant RAG chunks based on a query string using vector similarity search.
 */
export async function getRAGChunks(studentId: string, query: string, limit = 5): Promise<string[]> {
  try {
    // Generate embedding for the query
    const { embedding } = await insforge.ai.embed({
      model: 'text-embedding-3-small',
      input: query,
    });

    // Vector similarity search in material_chunks
    const chunks = await insforge.db.query<{ chunk_text: string }>(
      `SELECT mc.chunk_text
       FROM material_chunks mc
       JOIN materials m ON mc.material_id = m.id
       WHERE m.student_id = $1
       ORDER BY mc.embedding <=> $2::vector
       LIMIT $3`,
      [studentId, JSON.stringify(embedding), limit]
    );

    return chunks.map((c) => c.chunk_text);
  } catch (error) {
    console.error('Error fetching RAG chunks:', error);
    return [];
  }
}

/**
 * Fetches recent session messages for context.
 */
export async function getSessionHistory(
  studentId: string,
  limit = 10
): Promise<{ role: string; content: string }[]> {
  try {
    const messages = await insforge.db.query<{ role: string; message: string }>(
      `SELECT asm.role, asm.message
       FROM ai_session_messages asm
       JOIN ai_sessions s ON asm.session_id = s.id
       WHERE s.student_id = $1
       ORDER BY asm.created_at DESC
       LIMIT $2`,
      [studentId, limit]
    );

    return messages.reverse().map((m) => ({
      role: m.role,
      content: m.message,
    }));
  } catch (error) {
    console.error('Error fetching session history:', error);
    return [];
  }
}
