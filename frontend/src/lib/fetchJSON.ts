const fetchJSON = async (url: string): Promise<any> => {
  const response: Response = await fetch(url, { mode: 'cors' });
  const result = await response.json();
  return result;
};

export default fetchJSON;
