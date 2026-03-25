import axios from "axios";

const API_KEY = "55068921-c9c0644d1a9915f60fd1c8249";

export async function getImagesByQuery(query, page) {
    const response = await axios.get("https://pixabay.com/api/", {
        params: {
            key: API_KEY,
            q: query,
            page: page,
            per_page: 15,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
        },
    });

  return response.data;
}