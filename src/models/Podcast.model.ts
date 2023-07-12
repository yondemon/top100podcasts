export interface Podcast {
  collectionName: string;
  artworkUrl100: string;
  artistName: string;
}

export interface PodcastFromFeed {
  id: { attributes: Record<string,string>};
  'im:name': { label: string };
  'im:artist': { label: string };
  'im:image': { label: string }[];
  summary: { label: string };
}

export interface PodcastFromFeedNormalized {
  id: string;
  title: string;
  img: string;
  author: string;
  summary: string;
}
