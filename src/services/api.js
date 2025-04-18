const getIdolsData = async () => {
  const response = await fetch("http://localhost:5000/idols");
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
  throw new Error("Impossible to retrieve idols data");
};

const getNewsData = async () => {
  const response = await fetch("http://localhost:5000/news");
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
  throw new Error("Impossible to retrieve news data");
};

export { getIdolsData, getNewsData };
