export function millisecondsToTime(ms: number)
{
      var seconds = Math.floor((ms / 1000) % 60).toString().padStart(2,'0');
      var minutes = Math.floor((ms / (60 * 1000)) % 60).toString().padStart(2,'0');

      return minutes + ":" + seconds ;
}

export function beautifyDate(date: string) {
  return new Date(date).toLocaleDateString(
    'es-es'
  );
}