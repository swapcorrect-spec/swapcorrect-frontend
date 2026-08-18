/**
 * Strip HTML/script payloads from free-text before API submit.
 * Does not change normal plain text (letters, emoji, punctuation).
 */
export function sanitizeText(input: string): string {
  if (!input) return "";

  return input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/on\w+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/on\w+\s*=\s*[^\s>]+/gi, "")
    .replace(/javascript\s*:/gi, "")
    .replace(/data\s*:\s*text\/html/gi, "")
    .replace(/<\/?[^>]+>/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim();
}
