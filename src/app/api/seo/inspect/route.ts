import {
  inspectSeo,
  seoInspectRequestSchema,
} from '@/modules/seo/server/seo-inspector.server';
import {NextResponse} from 'next/server';

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const parsed = seoInspectRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {error: 'Invalid request payload', details: parsed.error.issues},
        {status: 400},
      );
    }

    const result = await inspectSeo(parsed.data.url);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unexpected error';
    return NextResponse.json(
      {
        error: 'Inspection failed',
        message,
      },
      {status: 500},
    );
  }
}
