'use client';

import JsonView from '@uiw/react-json-view';
import {githubLightTheme} from '@uiw/react-json-view/githubLight';
import {vscodeTheme} from '@uiw/react-json-view/vscode';
import {useTheme} from 'next-themes';

export function CollapsibleJson({data}: {data: unknown}) {
  const {resolvedTheme} = useTheme();
  const jsonTheme = resolvedTheme === 'light' ? githubLightTheme : vscodeTheme;

  return (
    <div className="rounded-md border border-border bg-muted/30 px-3 py-2">
      <JsonView
        value={data as object}
        collapsed={2}
        displayDataTypes={false}
        enableClipboard
        style={jsonTheme}
      />
    </div>
  );
}
