const getIdolsData = async () => {
  const response = await fetch("http://localhost:5000/idols");
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
  throw new Error("Impossible de récupérer les données des idols");
};

const getNewsData = async () => {
  const response = await fetch("http://localhost:5000/news");
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
  throw new Error("Impossible de récupérer les données des news");
};

export { getIdolsData, getNewsData };
