export function readingPause(
  line,
  { minimum = 1450, maximum = 2700, compact = false } = {},
) {
  const words = line.trim().split(/\s+/).filter(Boolean).length;
  const millisecondsPerWord = compact ? 245 : 220;
  const punctuationPause = /[.!?…:]$/.test(line.trim()) ? 180 : 80;
  return Math.min(maximum, Math.max(minimum, 520 + words * millisecondsPerWord + punctuationPause));
}
