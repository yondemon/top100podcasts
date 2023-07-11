export interface Podcast {
  collectionName: string;
  artworkUrl100: string;
  artistName: string;
}

export interface PodcastFromFeedInterface {
  id: { attributes: Record<string,string>};
  'im:name': { label: string };
  'im:artist': { label: string };
  'im:image': { label: string }[];
  summary: { label: string };
}