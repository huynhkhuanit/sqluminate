"use client";

import type { ChangeEvent, ErrorInfo, ReactNode } from "react";
import { Component } from "react";
import { MAX_SQL_LENGTH } from "@/lib/storage/query-storage";

interface EditorErrorBoundaryProps {
  children: ReactNode;
  query: string;
  onChange: (query: string) => void;
}

interface EditorErrorBoundaryState {
  hasError: boolean;
}

export class EditorErrorBoundary extends Component<
  EditorErrorBoundaryProps,
  EditorErrorBoundaryState
> {
  state: EditorErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): EditorErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Monaco failed to load.", error, errorInfo);
  }

  private handleFallbackChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    this.props.onChange(event.target.value);
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[360px] flex-col bg-[var(--surface)] md:min-h-[520px]">
          <div
            className="border-b border-[var(--border)] bg-[var(--danger-soft)] px-4 py-3 text-sm text-[var(--danger)]"
            role="alert"
          >
            Monaco could not start. The plain text fallback remains available.
          </div>
          <label className="sr-only" htmlFor="sql-editor-fallback">
            SQL editor fallback
          </label>
          <textarea
            className="min-h-[320px] flex-1 resize-none bg-[#17201c] p-4 font-mono text-sm leading-6 text-[#eef4f0] outline-none md:min-h-[476px]"
            id="sql-editor-fallback"
            maxLength={MAX_SQL_LENGTH}
            onChange={this.handleFallbackChange}
            spellCheck={false}
            value={this.props.query}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
