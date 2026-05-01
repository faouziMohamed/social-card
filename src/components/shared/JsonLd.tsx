/**
 * Renders a JSON-LD <script> tag for structured data.
 * Drop anywhere in a page or layout — safe for SSR and streaming.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled structured data, not user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

