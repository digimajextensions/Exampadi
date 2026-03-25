/**
 * InsForge client configuration.
 *
 * InsForge provides Postgres DB, AI Model Gateway, S3-compatible storage,
 * and pgvector for RAG. This module initialises the client used across
 * the application for all backend operations.
 *
 * Setup: npx @insforge/cli link --project-id d04375c0-5c70-47de-9185-c6fa98ec53ce
 */

// NOTE: @insforge/client will be installed via the InsForge CLI link step.
// The import below is typed but will only resolve after running the CLI link.

interface InsForgeConfig {
  apiUrl: string;
  apiKey: string;
}

interface InsForgeAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface InsForgeAIChatParams {
  model: string;
  system?: string;
  messages: InsForgeAIMessage[];
  stream?: boolean;
  max_tokens?: number;
}

interface InsForgeClient {
  ai: {
    chat: (params: InsForgeAIChatParams) => Promise<ReadableStream>;
    embed: (params: { model: string; input: string }) => Promise<{ embedding: number[] }>;
  };
  storage: {
    upload: (params: { bucket: string; path: string; file: Buffer | Blob; contentType: string }) => Promise<{ url: string }>;
    delete: (params: { bucket: string; path: string }) => Promise<void>;
    getUrl: (params: { bucket: string; path: string }) => string;
  };
  db: {
    query: <T = Record<string, unknown>>(sql: string, params?: unknown[]) => Promise<T[]>;
    execute: (sql: string, params?: unknown[]) => Promise<{ rowCount: number }>;
  };
}

function createInsForgeClient(config: InsForgeConfig): InsForgeClient {
  const baseHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.apiKey}`,
  };

  return {
    ai: {
      async chat(params: InsForgeAIChatParams) {
        const response = await fetch(`${config.apiUrl}/ai/chat`, {
          method: 'POST',
          headers: baseHeaders,
          body: JSON.stringify(params),
        });
        if (!response.ok) throw new Error(`InsForge AI error: ${response.status}`);
        return response.body as ReadableStream;
      },
      async embed(params) {
        const response = await fetch(`${config.apiUrl}/ai/embed`, {
          method: 'POST',
          headers: baseHeaders,
          body: JSON.stringify(params),
        });
        if (!response.ok) throw new Error(`InsForge embed error: ${response.status}`);
        return response.json();
      },
    },
    storage: {
      async upload(params) {
        const formData = new FormData();
        formData.append('file', params.file as Blob);
        formData.append('bucket', params.bucket);
        formData.append('path', params.path);
        const response = await fetch(`${config.apiUrl}/storage/upload`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${config.apiKey}` },
          body: formData,
        });
        if (!response.ok) throw new Error(`InsForge upload error: ${response.status}`);
        return response.json();
      },
      async delete(params) {
        await fetch(`${config.apiUrl}/storage/delete`, {
          method: 'DELETE',
          headers: baseHeaders,
          body: JSON.stringify(params),
        });
      },
      getUrl(params) {
        return `${config.apiUrl}/storage/${params.bucket}/${params.path}`;
      },
    },
    db: {
      async query<T = Record<string, unknown>>(sql: string, params?: unknown[]): Promise<T[]> {
        const response = await fetch(`${config.apiUrl}/db/query`, {
          method: 'POST',
          headers: baseHeaders,
          body: JSON.stringify({ sql, params }),
        });
        if (!response.ok) throw new Error(`InsForge DB error: ${response.status}`);
        const data = await response.json();
        return data.rows as T[];
      },
      async execute(sql: string, params?: unknown[]) {
        const response = await fetch(`${config.apiUrl}/db/execute`, {
          method: 'POST',
          headers: baseHeaders,
          body: JSON.stringify({ sql, params }),
        });
        if (!response.ok) throw new Error(`InsForge DB execute error: ${response.status}`);
        return response.json();
      },
    },
  };
}

export const insforge = createInsForgeClient({
  apiUrl: process.env.INSFORGE_API_URL || '',
  apiKey: process.env.INSFORGE_API_KEY || '',
});

export type { InsForgeClient, InsForgeAIChatParams, InsForgeAIMessage };
