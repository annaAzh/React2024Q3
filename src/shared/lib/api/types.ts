type FetchParams = {
  method: string;
  headers?: Record<string, string>;
};

type HeroResponse = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Record<string, string>;
  location: Record<string, string>;
  image: string;
  episode: Array<string>;
  url: string;
  created: string;
};

type InfoResponse = {
  count: number;
  next: string | null;
  prev: string | null;
  pages: number;
};

type SearchResponse = {
  info?: InfoResponse;
  results?: Array<HeroResponse>;
  error?: string;
};

export { type HeroResponse, type FetchParams, type SearchResponse };
