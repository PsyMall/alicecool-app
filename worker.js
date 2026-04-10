/**
 * Alicecool TTS Proxy Worker
 * Hides ElevenLabs API key from clients.
 * Accepts POST { text: "..." } and returns audio/mpeg.
 */

const ALLOWED_ORIGINS = [
  'https://psymall.github.io',
  'http://localhost',
  'http://127.0.0.1',
];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.some(o => origin && origin.startsWith(o));
  return {
    'Access-Control-Allow-Origin': allowed ? origin : 'https://psymall.github.io',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || '';
    const cors = corsHeaders(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors });
    }

    if (request.method === 'GET') {
      return new Response(
        JSON.stringify({ status: 'ok', service: 'alicecool-tts' }),
        { headers: { ...cors, 'Content-Type': 'application/json' } }
      );
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: cors });
    }

    try {
      const body = await request.json();
      const text = (body.text || '').toString().trim();

      if (!text) {
        return new Response(
          JSON.stringify({ error: 'Missing text' }),
          { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } }
        );
      }
      if (text.length > 200) {
        return new Response(
          JSON.stringify({ error: 'Text too long (max 200 chars)' }),
          { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } }
        );
      }

      const elevenResponse = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${env.VOICE_ID}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': env.ELEVENLABS_API_KEY,
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: { stability: 0.5, similarity_boost: 0.75 },
          }),
        }
      );

      if (!elevenResponse.ok) {
        const errText = await elevenResponse.text();
        return new Response(
          JSON.stringify({ error: 'TTS failed', status: elevenResponse.status, details: errText.slice(0, 500) }),
          { status: elevenResponse.status, headers: { ...cors, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(elevenResponse.body, {
        headers: {
          ...cors,
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: 'Internal error', message: err.message }),
        { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } }
      );
    }
  },
};
