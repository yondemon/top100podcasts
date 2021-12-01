export function containsTextI(haystack: string, needle: string) {
  return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
}