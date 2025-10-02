'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { MODELS, Column } from '../types/model';
import { StatusBadge } from '../components/StatusBadge';
import Playground from "@/components/Playground";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Playground</h1>
      <Playground />
    </main>
  );
} 