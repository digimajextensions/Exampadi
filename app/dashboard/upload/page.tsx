'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Upload, File, Trash2, CheckCircle, Loader2 } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  uploadedAt: string;
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = async (selectedFiles: File[]) => {
    for (const file of selectedFiles) {
      if (!file.name.endsWith('.pdf')) {
        alert('Only PDF files are supported');
        continue;
      }

      const tempId = `temp_${Date.now()}_${Math.random()}`;
      const newFile: UploadedFile = {
        id: tempId,
        name: file.name,
        size: file.size,
        status: 'uploading',
        uploadedAt: new Date().toISOString(),
      };

      setFiles((prev) => [...prev, newFile]);

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', { method: 'POST', body: formData });

        if (response.ok) {
          const data = await response.json();
          setFiles((prev) =>
            prev.map((f) => (f.id === tempId ? { ...f, id: data.id, status: 'ready' } : f))
          );
        } else {
          setFiles((prev) =>
            prev.map((f) => (f.id === tempId ? { ...f, status: 'error' } : f))
          );
        }
      } catch {
        setFiles((prev) =>
          prev.map((f) => (f.id === tempId ? { ...f, status: 'error' } : f))
        );
      }
    }
  };

  const handleDelete = async (fileId: string) => {
    try {
      await fetch(`/api/materials/${fileId}`, { method: 'DELETE' });
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-text-primary">Study Materials</h1>
        <p className="text-text-secondary text-sm mt-1">Upload past questions and course materials for AI-powered study sessions.</p>
      </div>

      {/* Upload zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
          isDragging ? 'border-green-500 bg-green-50' : 'border-border bg-white'
        }`}
      >
        <Upload className="h-10 w-10 text-text-muted mx-auto mb-4" />
        <h3 className="font-display font-bold text-lg text-text-primary mb-2">
          Drop your PDF files here
        </h3>
        <p className="text-sm text-text-secondary mb-4">or click to browse. PDF files only, max 20MB each.</p>
        <label className="cursor-pointer">
          <input type="file" accept=".pdf" multiple onChange={handleFileSelect} className="hidden" />
          <span className="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 border-2 border-green-500 text-green-500 hover:bg-green-50 text-sm px-5 py-2.5 h-10">
            Browse Files
          </span>
        </label>
      </div>

      {/* Files list */}
      {files.length > 0 && (
        <div>
          <h2 className="font-display font-bold text-lg text-text-primary mb-4">Your Materials</h2>
          <div className="space-y-3">
            {files.map((file) => (
              <Card key={file.id} className="flex items-center gap-4 py-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                  <File className="h-5 w-5 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-text-primary truncate">{file.name}</div>
                  <div className="text-xs text-text-muted">{formatSize(file.size)}</div>
                </div>
                <div className="flex items-center gap-2">
                  {file.status === 'uploading' && <Loader2 className="h-4 w-4 text-green-500 animate-spin" />}
                  {file.status === 'processing' && <Loader2 className="h-4 w-4 text-gold-500 animate-spin" />}
                  {file.status === 'ready' && <CheckCircle className="h-4 w-4 text-green-500" />}
                  {file.status === 'error' && <span className="text-xs text-red-500">Failed</span>}
                  <button onClick={() => handleDelete(file.id)} className="text-text-muted hover:text-red-500 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
