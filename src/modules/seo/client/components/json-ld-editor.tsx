'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import JsonView from '@uiw/react-json-view';
import JsonViewEditor from '@uiw/react-json-view/editor';
import {vscodeTheme} from '@uiw/react-json-view/vscode';
import {RefreshCcw} from 'lucide-react';
import {useMemo, useState} from 'react';

export interface JsonLdEditorProps {
  initialJson: string;
  onJsonChange: (next: string) => void;
}

export function JsonLdEditor({initialJson, onJsonChange}: JsonLdEditorProps) {
  const [jsonText, setJsonText] = useState(initialJson);
  const initialParsed = useMemo(
    () => safeParseJson(initialJson),
    [initialJson],
  );
  const [editorValue, setEditorValue] = useState<Record<string, unknown>>(
    initialParsed.ok ? initialParsed.value : {},
  );
  const parsed = useMemo(() => safeParseJson(jsonText), [jsonText]);
  const errorMessage = parsed.ok ? '' : parsed.error;

  const syncFromObject = () => {
    const next = JSON.stringify(editorValue, null, 2);
    setJsonText(next);
    onJsonChange(next);
  };

  return (
    <section className="rounded-xl border border-border/30 bg-card/20 p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-fg/50">
          JSON-LD Editor
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={syncFromObject}
          className="h-7 rounded-full px-3 text-[11px]"
        >
          <RefreshCcw className="mr-1.5 h-3 w-3" />
          Sync from tree edits
        </Button>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <div className="min-w-0 rounded-lg border border-border/30 bg-card/40 p-2">
          <JsonViewEditor
            value={editorValue}
            collapsed={1}
            displayDataTypes={false}
            enableClipboard
            style={vscodeTheme}
            onEdit={() => {
              // The editor mutates object references. Clone to trigger a React render.
              setEditorValue(prev => structuredClone(prev));
              return true;
            }}
          />
        </div>

        <div className="min-w-0 space-y-2">
          <Input
            value={errorMessage}
            readOnly
            placeholder="JSON parse status"
            className={
              errorMessage
                ? 'border-red-500/40 text-red-300'
                : 'border-terminal-green/30 text-terminal-green'
            }
          />
          <Textarea
            value={jsonText}
            onChange={e => {
              const next = e.target.value;
              setJsonText(next);
              onJsonChange(next);
              const nextParsed = safeParseJson(next);
              if (nextParsed.ok) setEditorValue(nextParsed.value);
            }}
            className="min-h-[320px] resize-y font-mono text-xs"
            spellCheck={false}
          />
          <div className="rounded-md border border-border/30 bg-card/30 p-2">
            <JsonView
              value={parsed.ok ? parsed.value : {error: errorMessage}}
              collapsed={1}
              displayDataTypes={false}
              enableClipboard
            />
          </div>
        </div>
      </div>
    </section>
  );
}

interface ParseSuccess {
  ok: true;
  value: Record<string, unknown>;
}

interface ParseError {
  ok: false;
  error: string;
}

function safeParseJson(input: string): ParseSuccess | ParseError {
  try {
    const value = JSON.parse(input) as unknown;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return {ok: true, value: value as Record<string, unknown>};
    }
    return {ok: false, error: 'JSON must be an object at the root level.'};
  } catch (error) {
    return {
      ok: false,
      error: `Invalid JSON: ${(error as Error).message}`,
    };
  }
}
