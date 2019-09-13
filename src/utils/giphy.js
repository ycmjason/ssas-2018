export const getRandomGif = async search => {
  const res = await fetch(
    `//api.giphy.com/v1/gifs/random?api_key=5ZiDzE9O3Ey92la0cgHyXPVL2klNIRkm&tag=${window.encodeURIComponent(
      search,
    )}`,
  );
  const { data } = await res.json();
  return data.image_original_url;
};
