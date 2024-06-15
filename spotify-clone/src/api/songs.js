const API_URL = 'https://cms.samespace.com/items/songs';

export const getSongs = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};