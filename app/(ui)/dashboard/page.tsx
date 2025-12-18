'use client'

import { useState, useEffect } from 'react';
import { useThemeMode } from "@/components/ThemeProvider";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { FaGithub } from "react-icons/fa";

export default function DashboardReadme() {
  const [readme, setReadme] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { accentColor } = useThemeMode();

  useEffect(() => {
    async function fetchReadme() {
      try {
        const res = await fetch(
          'https://raw.githubusercontent.com/andri-creative/andri-creative/main/README.md',
          { cache: 'no-store' }
        );

        if (!res.ok) throw new Error('Failed to fetch README');

        const text = await res.text();
        setReadme(text);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Unexpected error occurred';
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchReadme();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-16 w-16 border-b-4 mx-auto mb-4"
            style={{ borderColor: `var(--${accentColor}-9)` }}
          ></div>
          <p className="text-lg" style={{ color: 'var(--gray-11)' }}>Loading README...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="border rounded-lg p-6 max-w-md"
          style={{
            backgroundColor: 'var(--red-2)',
            borderColor: 'var(--red-6)'
          }}
        >
          <div className="flex items-center mb-3">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: 'var(--red-9)' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-semibold" style={{ color: 'var(--red-11)' }}>Error Loading README</h3>
          </div>
          <p style={{ color: 'var(--red-11)' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gray-1)' }}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header Card */}
        <div
          className="rounded-2xl shadow-lg p-6 mb-8 border"
          style={{
            backgroundColor: 'var(--gray-2)',
            borderColor: 'var(--gray-6)'
          }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div
                className="rounded-full p-3"
                style={{
                  background: `linear-gradient(135deg, var(--${accentColor}-9), var(--${accentColor}-10))`
                }}
              >
                <FaGithub className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold" style={{ color: 'var(--gray-12)' }}>GitHub Profile</h1>
                <p style={{ color: 'var(--gray-11)' }}>@andri-creative</p>
              </div>
            </div>
            <a
              href="https://github.com/andri-creative"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg"
              style={{
                backgroundColor: `var(--${accentColor}-9)`,
                color: 'white'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `var(--${accentColor}-10)`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `var(--${accentColor}-9)`}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </a>
          </div>
        </div>

        {/* README Content Card */}
        <div
          className="rounded-2xl shadow-lg overflow-hidden border"
          style={{
            backgroundColor: 'var(--gray-2)',
            borderColor: 'var(--gray-6)'
          }}
        >
          <div className="markdown-wrapper p-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className="text-4xl font-bold mb-6 pb-4"
                    style={{
                      color: 'var(--gray-12)',
                      borderBottom: `3px solid var(--${accentColor}-9)`
                    }}
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-3xl font-bold mb-4 mt-8 pb-2"
                    style={{
                      color: 'var(--gray-12)',
                      borderBottom: '2px solid var(--gray-6)'
                    }}
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-2xl font-semibold mb-3 mt-6"
                    style={{ color: 'var(--gray-12)' }}
                    {...props}
                  />
                ),
                h4: ({ node, ...props }) => (
                  <h4
                    className="text-xl font-semibold mb-2 mt-4"
                    style={{ color: 'var(--gray-12)' }}
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="mb-4 leading-relaxed"
                    style={{ color: 'var(--gray-11)' }}
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    className="list-disc list-inside mb-4 space-y-2"
                    style={{ color: 'var(--gray-11)' }}
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    className="list-decimal list-inside mb-4 space-y-2"
                    style={{ color: 'var(--gray-11)' }}
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  <li
                    className="ml-4"
                    style={{ color: 'var(--gray-11)' }}
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => (
                  <a
                    className="underline font-medium transition-colors"
                    style={{ color: `var(--${accentColor}-11)` }}
                    onMouseEnter={(e) => e.currentTarget.style.color = `var(--${accentColor}-10)`}
                    onMouseLeave={(e) => e.currentTarget.style.color = `var(--${accentColor}-11)`}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                img: ({ node, ...props }) => (
                  <img
                    className="max-w-full h-auto rounded-lg my-4 mx-auto"
                    style={{ boxShadow: 'var(--shadow-3)' }}
                    loading="lazy"
                    {...props}
                  />
                ),
                code: ({ node, className, children, ...props }) => {
                  const isBlock = className?.includes('language-');

                  return isBlock ? (
                    <pre className="rounded-lg overflow-x-auto my-4">
                      <code
                        className="block p-4 text-sm font-mono"
                        style={{
                          backgroundColor: 'var(--gray-3)',
                          color: 'var(--gray-12)',
                        }}
                        {...props}
                      >
                        {children}
                      </code>
                    </pre>
                  ) : (
                    <code
                      className="px-2 py-1 rounded text-sm font-mono"
                      style={{
                        backgroundColor: 'var(--gray-3)',
                        color: 'var(--red-11)',
                      }}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },

                pre: ({ node, ...props }) => (
                  <pre
                    className="rounded-lg overflow-hidden my-4"
                    style={{ backgroundColor: 'var(--gray-3)' }}
                    {...props}
                  />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="pl-4 italic my-4"
                    style={{
                      borderLeft: `4px solid var(--${accentColor}-9)`,
                      color: 'var(--gray-11)'
                    }}
                    {...props}
                  />
                ),
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-4">
                    <table
                      className="min-w-full border rounded-lg"
                      style={{ borderColor: 'var(--gray-6)' }}
                      {...props}
                    />
                  </div>
                ),
                th: ({ node, ...props }) => (
                  <th
                    className="border px-4 py-2 font-semibold text-left"
                    style={{
                      backgroundColor: 'var(--gray-3)',
                      borderColor: 'var(--gray-6)',
                      color: 'var(--gray-12)'
                    }}
                    {...props}
                  />
                ),
                td: ({ node, ...props }) => (
                  <td
                    className="border px-4 py-2"
                    style={{
                      borderColor: 'var(--gray-6)',
                      color: 'var(--gray-11)'
                    }}
                    {...props}
                  />
                ),
                hr: ({ node, ...props }) => (
                  <hr
                    className="my-8"
                    style={{ borderTop: '2px solid var(--gray-6)' }}
                    {...props}
                  />
                ),
              }}
            >
              {readme}
            </ReactMarkdown>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm">
          <p style={{ color: 'var(--gray-11)' }}>
            Synced with GitHub Repository • Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <style jsx global>{`
        .markdown-wrapper {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }
        
        /* Ensure images load properly */
        .markdown-wrapper img {
          display: block;
          max-width: 100%;
          height: auto;
        }

        /* Fix for shields.io badges */
        .markdown-wrapper img[src*="shields.io"],
        .markdown-wrapper img[src*="komarev.com"],
        .markdown-wrapper img[src*="github-readme-stats"],
        .markdown-wrapper img[src*="github-readme-streak-stats"],
        .markdown-wrapper img[src*="github-profile-trophy"],
        .markdown-wrapper img[src*="github-readme-activity-graph"] {
          display: inline-block;
          margin: 4px;
        }

        /* Center aligned content from markdown */
        .markdown-wrapper div[align="center"] {
          text-align: center;
        }

        .markdown-wrapper div[align="center"] > * {
          margin-left: auto;
          margin-right: auto;
        }

        /* Paragraph with images */
        .markdown-wrapper p:has(img) {
          text-align: center;
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Fix for inline badges in paragraphs */
        .markdown-wrapper p > img {
          display: inline-block;
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
}