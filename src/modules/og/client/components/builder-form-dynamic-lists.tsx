'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {
  getChangelogEntries,
  getFaqEntries,
} from '@/modules/og/client/components/builder-form.utils';

export function ChangelogFieldList({
  params,
  onParamChange,
}: {
  params: Record<string, string>;
  onParamChange: (key: string, value: string) => void;
}) {
  const entries = getChangelogEntries(params);

  const addEntry = () => {
    const nextIndex = (entries.at(-1)?.index ?? 0) + 1;
    onParamChange(`change${nextIndex}`, '');
  };

  const removeEntry = (index: number) => {
    onParamChange(`change${index}`, '');
  };

  return (
    <div className="flex flex-col gap-3">
      <span className="text-[10px] font-medium text-muted-fg/50">Changes</span>
      {entries.map((entry, index) => (
        <div
          key={entry.index}
          className="rounded-lg border border-border/30 p-3"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-medium text-muted-fg/50">
              Change {index + 1}
            </span>
            {entries.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEntry(entry.index)}
                className="h-7 px-2 text-[10px]"
              >
                Remove
              </Button>
            )}
          </div>
          <Input
            type="text"
            value={entry.value}
            onChange={e =>
              onParamChange(`change${entry.index}`, e.target.value)
            }
            placeholder="Describe the release change"
            className="h-8 w-full text-xs"
          />
        </div>
      ))}
      <Button variant="outline" onClick={addEntry} className="h-8 text-xs">
        Add Change
      </Button>
    </div>
  );
}

export function FaqFieldList({
  params,
  onParamChange,
  onParamDelete,
}: {
  params: Record<string, string>;
  onParamChange: (key: string, value: string) => void;
  onParamDelete?: (key: string) => void;
}) {
  const entries = getFaqEntries(params);

  const addEntry = () => {
    const lastIndex = entries.at(-1)?.index ?? 0;
    const nextIndex = lastIndex + 1;
    onParamChange(`faqQuestion${nextIndex}`, '');
    onParamChange(`faqAnswer${nextIndex}`, '');
  };

  const removeEntry = (index: number) => {
    const target = index + 1;
    if (onParamDelete) {
      onParamDelete(`faqQuestion${target}`);
      onParamDelete(`faqAnswer${target}`);
      return;
    }
    onParamChange(`faqQuestion${target}`, '');
    onParamChange(`faqAnswer${target}`, '');
  };

  return (
    <div className="flex flex-col gap-3">
      {entries.map((entry, index) => (
        <div
          key={entry.index}
          className="rounded-lg border border-border/30 p-3"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-medium text-muted-fg/50">
              FAQ {index + 1}
            </span>
            {entries.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEntry(index)}
                className="h-7 px-2 text-[10px]"
              >
                Remove
              </Button>
            )}
          </div>
          <div className="grid gap-2">
            <Input
              type="text"
              value={entry.question}
              onChange={e =>
                onParamChange(`faqQuestion${entry.index}`, e.target.value)
              }
              placeholder="Question"
              className="h-8 w-full text-xs"
            />
            <Input
              type="text"
              value={entry.answer}
              onChange={e =>
                onParamChange(`faqAnswer${entry.index}`, e.target.value)
              }
              placeholder="Answer"
              className="h-8 w-full text-xs"
            />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addEntry} className="h-8 text-xs">
        Add FAQ
      </Button>
    </div>
  );
}
