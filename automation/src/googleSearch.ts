import axios from 'axios';

interface OrganicResult {
  link: string;
}

export const searchGoogle = async (query: string) => {
  const res = await axios.get('https://serpapi.com/search', {
    params: {
      api_key: process.env.SERP_API_KEY,
      q: query,
    },
  });

  return res.data.organic_results
    .filter((r: OrganicResult) => !r.link.includes('beyondchats'))
    .slice(0, 2)
    .map((r: OrganicResult) => r.link);
};
