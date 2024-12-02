import axios from "axios";
import { Video, VideoQueryResult } from "../types/video.types";

const getVideoSuggestions = async (query: string): Promise<Video[] | null> => {
  try {
    const response = await axios.get<VideoQueryResult>(
      import.meta.env.VITE_YOUTUBE_SEARCH_API_URL,
      {
        params: {
          part: "snippet",
          q: query,
          type: "videos",
          maxResults: 5,
          key: import.meta.env.VITE_YOUTUBE_API_KEY,
        },
      },
    );

    return response.data.items.map((item) => ({
      videoId: item.id.videoId,
      thumbnailUrl: item.snippet.thumbnails.default.url,
    }));
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
};

export default getVideoSuggestions;
